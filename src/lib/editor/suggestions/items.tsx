import { Editor, Range } from "@tiptap/core";

const getSuggestionItems = ({ query }: { query: string }) => {
  const categories = [
    {
      title: "Text",
      items: [
        {
          title: "Convert to paragraph",
          id: "paragraph",
          command: ({ editor, range }: { editor: Editor; range: Range }) => {
            editor.chain().focus().deleteRange(range).setNode("paragraph").run();
          },
        },
        {
          title: "Convert to heading",
          id: "heading",
          command: ({ editor, range }: { editor: Editor; range: Range }) => {
            editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run();
          },
        },
        {
          title: "Convert to subheading",
          id: "subheading",
          command: ({ editor, range }: { editor: Editor; range: Range }) => {
            editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run();
          },
        },
        {
          title: "Convert to subsubheading",
          id: "subsubheading",
          command: ({ editor, range }: { editor: Editor; range: Range }) => {
            editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run();
          },
        },
      ],
    },
    {
      title: "Format",
      items: [
        {
          title: "Format as bold",
          id: "bold",
          command: ({ editor, range }: { editor: Editor; range: Range }) => {
            editor.chain().focus().deleteRange(range).setMark("bold").run();
          },
        },
        {
          title: "Format as italic",
          id: "italic",
          command: ({ editor, range }: { editor: Editor; range: Range }) => {
            editor.chain().focus().deleteRange(range).setMark("italic").run();
          },
        },
      ],
    },
    {
      title: "Elements",
      items: [
        {
          title: "Insert image",
          id: "image",
          command: ({ editor, range }: { editor: Editor; range: Range }) => {
            console.log("call some function from parent");
            editor.chain().focus().deleteRange(range).setNode("paragraph").run();
          },
        },
        {
          title: "Insert table",
          id: "table",
          command: ({ editor, range }: { editor: Editor; range: Range }) => {
            editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
          },
        },
      ],
    },
  ];

  // Filter items based on query and limit the number of suggestions
  return categories
    .map(category => ({
      ...category,
      items: category.items
        .filter(
          item =>
            item.title.toLowerCase().startsWith(query.toLowerCase()) ||
            item.id.toLowerCase().startsWith(query.toLowerCase())
        )
        .slice(0, 10),
    }))
    .filter(category => category.items.length > 0);
};

export default getSuggestionItems;
