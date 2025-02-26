import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Youtube as YoutubeIcon,
  Quote,
  // CodeSquare,
  Minus,
  Paperclip, // Add the Paperclip icon for "Attach File"
} from 'lucide-react';
import '../ui/richtext.css'; // Ensure this CSS file is correctly imported

// Custom Image Extension
const CustomImage = Image.extend({
  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      id: {
        default: null,
      },
    };
  },
});

interface RichTextEditorProps {
  content: string; // The content of the editor (HTML string)
  onChange: (content: string) => void; // Callback for when the content changes
  onTempFileUpload?: (tempFilePath: string) => void; // Callback for temporary file uploads (optional)
  textOnly?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange, onTempFileUpload, textOnly = false }) => {
  const domain = import.meta.env.VITE_MAIN_DOMAIN
  const [uploading, setUploading] = useState(false);


  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      CustomImage, // Use the custom image extension
      Link.configure({
        openOnClick: true, // Allow links to be clickable
        HTMLAttributes: {
          target: '_blank', // Open links in a new tab
          rel: 'noopener noreferrer', // Security attributes
        },
        validate: (href) => {
          // Ensure the URL is absolute (starts with http:// or https://)
          return /^https?:\/\//.test(href);
        },
      }),
      Youtube.configure({
        inline: true,
        controls: true,
        width: 640,
        height: 480,
        nocookie: true
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html); // Pass the updated content to the parent component
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc',
      },
      handlePaste: (view, event: ClipboardEvent) => {
        const clipboardData = event.clipboardData;
        if (!clipboardData) return false
        const items = clipboardData.items;
        for (const item of items) {
          if (item.type.indexOf('image') === 0) {
            const file = item.getAsFile();
            if (file) { // Check if file is not null
              handleFileUpload(file, view.state.selection.anchor);
              return true;
            }
            return true;
          }
        }
        return false;
      },
      handleDrop: (view, event) => {
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
          const file = files[0];
          if (file.type.indexOf('image') === 0) {
            handleFileUpload(file, view.state.selection.anchor);
            return true;
          }
        }
        return false;
      },
    },
  });

  const handleFileUpload = async (file: File, position: number) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await fetch(`${domain}/api/upload-file/`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload file');
      }
  
      const data = await response.json();
      const tempFilePath = data.fileUrl; // Temporary file path
      const fileName = data.fileName; // File name
      const fileId = data.fichierId
      console.log("here is the file tempFilePath", tempFilePath);
  
      // Store the temporary file path in state
      if (onTempFileUpload) {
        onTempFileUpload(fileId);
      }
  
      if (file.type.startsWith('image/')) {
        // Handle image files: display the image directly
        editor
          ?.chain()
          .insertContentAt(position, {
            type: 'image',
            attrs: {
              id: 'uploadIMG',
              class: 'uploadIMG',
              src: tempFilePath, // Use the temporary file path
            },
          })
          .focus()
          .run();
      } else {
        // Handle non-image files: display the file name as a clickable link
        editor
          ?.chain()
          .insertContentAt(position, {
            type: 'text',
            text: fileName, // Use the file name
            marks: [
              {
                type: 'link',
                attrs: {
                  href: tempFilePath, // Use the temporary file path as the link
                  target: '_blank',
                  rel: 'noopener noreferrer',
                },
              },
            ],
          })
          .focus()
          .run();
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleImageUploadClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0]; // Narrow down the type
      if (file) {
        handleFileUpload(file, editor?.state.selection.anchor || 0); // Handle the file
      }
    };
    input.click();
  };
  const handleFileUploadClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '*/*'; // Allow all file types
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0]; // Narrow down the type
      if (file) {
        handleFileUpload(file, editor?.state.selection.anchor || 0); // Handle the file
      }
    };
    input.click();
  };

  const addYoutubeVideo = () => {
    const url = prompt('Veuillez entrer le lien YouTube');
    if (url) {
      console.log("Here is the URL:", url);
      const videoId = extractYoutubeId(url);
      if (videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        editor?.chain().focus().setYoutubeVideo({ src: embedUrl }).run();
      } else {
        alert('Lien YouTube invalide. Veuillez réessayer.');
      }
    }
  };
  
  function extractYoutubeId(url: string): string {
    const videoIdMatch = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return videoIdMatch ? videoIdMatch[1] : '';
  }

  const setLink = () => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
  
    // Cancelled
    if (url === null) {
      return;
    }
  
    // Empty
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
  
    // Add https if no protocol is specified
    const validUrl = url.match(/^https?:\/\//) ? url : `https://${url}`;
  
    // Validate the URL
    if (!/^https?:\/\/\S+$/.test(validUrl)) {
      alert('Please enter a valid URL.');
      return;
    }
  
    // Set the link with the validated URL
    editor
      ?.chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: validUrl })
      .run();
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="rich-text-editor">
      {/* Toolbar */}
      <div className="toolbar">
        {/* Text Formatting */}
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={editor?.isActive('bold') ? 'is-active' : ''}
        >
          <Bold size={20} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={editor?.isActive('italic') ? 'is-active' : ''}
        >
          <Italic size={20} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={editor?.isActive('underline') ? 'is-active' : ''}
        >
          <UnderlineIcon size={20} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          className={editor?.isActive('strike') ? 'is-active' : ''}
        >
          <Strikethrough size={20} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleCode().run()}
          className={editor?.isActive('code') ? 'is-active' : ''}
        >
          <Code size={20} />
        </button>

        {/* Headings */}
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor?.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          <Heading1 size={20} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor?.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          <Heading2 size={20} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor?.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        >
          <Heading3 size={20} />
        </button>

        {/* Lists */}
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={editor?.isActive('bulletList') ? 'is-active' : ''}
        >
          <List size={20} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={editor?.isActive('orderedList') ? 'is-active' : ''}
        >
          <ListOrdered size={20} />
        </button>

        {/* Links and Images */}
        <button type="button" onClick={setLink}>
          <LinkIcon size={20} />
        </button>
        {/* Conditionally render image, file upload, and YouTube buttons */}
        {!textOnly && (
          <>
            <button type="button" onClick={handleImageUploadClick} disabled={uploading}>
              <ImageIcon size={20} />
            </button>
            <button type="button" onClick={handleFileUploadClick} disabled={uploading}>
              <Paperclip size={20} />
            </button>
            <button type="button" onClick={addYoutubeVideo}>
              <YoutubeIcon size={20} />
            </button>
          </>
        )}

        {/* Attach File */}
        <button type="button" onClick={handleFileUploadClick} disabled={uploading}>
          <Paperclip size={20} />
        </button>


        {/* Blockquotes and Code Blocks */}
        <button
        type="button"
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          className={editor?.isActive('blockquote') ? 'is-active' : ''}
        >
          <Quote size={20} />
        </button>
        {/* <button
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          className={editor?.isActive('codeBlock') ? 'is-active' : ''}
        >
          <CodeSquare size={20} />
        </button> */}

        {/* Horizontal Rule */}
        <button type="button" onClick={() => editor?.chain().focus().setHorizontalRule().run()}>
          <Minus size={20} />
        </button>
      </div>

      {/* Editor Content */}
      <div className="editor-content prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;