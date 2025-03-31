
import Markdown from "markdown-to-jsx";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  // Define custom components for markdown rendering
  const MarkdownParagraph = ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 break-words" {...props}>{children}</p>
  );

  const MarkdownH1 = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-2xl font-bold mb-4" {...props}>{children}</h1>
  );

  const MarkdownH2 = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-xl font-bold mb-3" {...props}>{children}</h2>
  );

  const MarkdownH3 = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-lg font-bold mb-2" {...props}>{children}</h3>
  );

  const MarkdownUl = ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-5 mb-4" {...props}>{children}</ul>
  );

  const MarkdownOl = ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-5 mb-4" {...props}>{children}</ol>
  );

  const MarkdownLi = ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="mb-1" {...props}>{children}</li>
  );

  const MarkdownA = ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-blue-600 hover:underline" {...props}>{children}</a>
  );

  const MarkdownBlockquote = ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props}>{children}</blockquote>
  );

  const MarkdownHr = (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-4 border-t border-gray-300" {...props} />
  );

  const markdownOptions = {
    overrides: {
      p: { component: MarkdownParagraph },
      h1: { component: MarkdownH1 },
      h2: { component: MarkdownH2 },
      h3: { component: MarkdownH3 },
      ul: { component: MarkdownUl },
      ol: { component: MarkdownOl },
      li: { component: MarkdownLi },
      a: { component: MarkdownA },
      blockquote: { component: MarkdownBlockquote },
      hr: { component: MarkdownHr },
    },
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 prose prose-sm max-w-none bg-gray-50 rounded-md">
      <Markdown options={markdownOptions}>
        {content}
      </Markdown>
    </div>
  );
};

export default MarkdownRenderer;
