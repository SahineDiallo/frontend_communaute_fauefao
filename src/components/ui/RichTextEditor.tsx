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
  Minus,
  Paperclip,
} from 'lucide-react';
import UploadProgress from './UploadProgress'; // Assurez-vous d'avoir un composant Progress
import '../ui/richtext.css'; // Assurez-vous que ce fichier CSS est correctement importé

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
  content: string; // Le contenu de l'éditeur (chaîne HTML)
  onChange: (content: string) => void; // Callback pour les changements de contenu
  onTempFileUpload?: (tempFilePath: string) => void; // Callback pour les uploads de fichiers temporaires (optionnel)
  textOnly?: boolean;
}

interface Upload {
  id: string; // Identifiant unique pour chaque upload
  file: File; // Fichier en cours d'upload
  progress: number; // Progression de l'upload
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange, onTempFileUpload, textOnly = false }) => {
  const [uploads, setUploads] = useState<Upload[]>([]); // État pour gérer les uploads en cours

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      CustomImage, // Utilisez l'extension d'image personnalisée
      Link.configure({
        openOnClick: true, // Permettre aux liens d'être cliquables
        HTMLAttributes: {
          target: '_blank', // Ouvrir les liens dans un nouvel onglet
          rel: 'noopener noreferrer', // Attributs de sécurité
        },
        validate: (href) => {
          // S'assurer que l'URL est absolue (commence par http:// ou https://)
          return /^https?:\/\//.test(href);
        },
      }),
      Youtube.configure({
        inline: true,
        controls: true,
        width: 640,
        height: 480,
        nocookie: true,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html); // Passer le contenu mis à jour au composant parent
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc',
      },
      handlePaste: (view, event: ClipboardEvent) => {
        const clipboardData = event.clipboardData;
        if (!clipboardData) return false;
        const items = clipboardData.items;
        for (const item of items) {
          if (item.type.indexOf('image') === 0) {
            const file = item.getAsFile();
            if (file) {
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
    const uploadId = Date.now().toString(); // Identifiant unique pour l'upload
    const newUpload: Upload = {
      id: uploadId,
      file,
      progress: 0,
    };

    // Ajouter l'upload à la liste des uploads en cours
    setUploads((prevUploads) => [...prevUploads, newUpload]);

    // Simuler un upload avec une progression
    const simulateUpload = () => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 10; // Augmenter aléatoirement la progression
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);

          // Simuler la fin de l'upload
          setTimeout(() => {
            // Créer une URL locale pour le fichier (blob URL)
            const tempFilePath = URL.createObjectURL(file);
            const fileName = file.name;
            const fileId = Date.now().toString(); // ID temporaire

            if (onTempFileUpload) {
              onTempFileUpload(fileId);
            }

            // Insérer le contenu dans l'éditeur
            if (file.type.startsWith('image/')) {
              editor
                ?.chain()
                .insertContentAt(position, {
                  type: 'image',
                  attrs: {
                    id: 'uploadIMG',
                    class: 'uploadIMG',
                    src: tempFilePath,
                  },
                })
                .focus()
                .run();
            } else {
              editor
                ?.chain()
                .insertContentAt(position, {
                  type: 'text',
                  text: fileName,
                  marks: [
                    {
                      type: 'link',
                      attrs: {
                        href: tempFilePath,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      },
                    },
                  ],
                })
                .focus()
                .run();
            }

            // Retirer l'upload de la liste une fois terminé
            setUploads((prevUploads) => prevUploads.filter((upload) => upload.id !== uploadId));
          }, 500); // Délai avant de terminer le processus
        }

        // Mettre à jour la progression de l'upload
        setUploads((prevUploads) =>
          prevUploads.map((upload) =>
            upload.id === uploadId ? { ...upload, progress: Math.min(Math.round(progress), 100) } : upload
          )
        );
      }, 200); // Mettre à jour la progression toutes les 200ms
    };

    // Démarrer la simulation
    simulateUpload();
  };

  const handleImageUploadClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        handleFileUpload(file, editor?.state.selection.anchor || 0);
      }
    };
    input.click();
  };

  const handleFileUploadClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '*/*';
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        handleFileUpload(file, editor?.state.selection.anchor || 0);
      }
    };
    input.click();
  };

  const addYoutubeVideo = () => {
    const url = prompt('Veuillez entrer le lien YouTube');
    if (url) {
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

    if (url === null) {
      return;
    }

    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    const validUrl = url.match(/^https?:\/\//) ? url : `https://${url}`;

    if (!/^https?:\/\/\S+$/.test(validUrl)) {
      alert('Veuillez entrer une URL valide.');
      return;
    }

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
      {/* Barres de progression en haut du composant */}
      <div className="bg-white p-4 shadow-md">
        {uploads.map((upload) => (
          <div key={upload.id} className="mb-2">
            <UploadProgress value={upload.progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-1">
              {upload.progress}% completed - {upload.file.name}
            </p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        {/* Boutons de formatage de texte */}
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

        {/* Boutons pour les titres */}
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

        {/* Boutons pour les listes */}
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

        {/* Boutons pour les liens et images */}
        <button type="button" onClick={setLink}>
          <LinkIcon size={20} />
        </button>
        {!textOnly && (
          <>
            <button type="button" onClick={handleImageUploadClick} disabled={uploads.length > 0}>
              <ImageIcon size={20} />
            </button>
            <button type="button" onClick={handleFileUploadClick} disabled={uploads.length > 0}>
              <Paperclip size={20} />
            </button>
            <button type="button" onClick={addYoutubeVideo}>
              <YoutubeIcon size={20} />
            </button>
          </>
        )}

        {/* Bouton pour les fichiers */}
        <button type="button" onClick={handleFileUploadClick} disabled={uploads.length > 0}>
          <Paperclip size={20} />
        </button>

        {/* Bouton pour les citations */}
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          className={editor?.isActive('blockquote') ? 'is-active' : ''}
        >
          <Quote size={20} />
        </button>

        {/* Bouton pour la ligne horizontale */}
        <button type="button" onClick={() => editor?.chain().focus().setHorizontalRule().run()}>
          <Minus size={20} />
        </button>
      </div>

      {/* Contenu de l'éditeur */}
      <div className="editor-content prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;