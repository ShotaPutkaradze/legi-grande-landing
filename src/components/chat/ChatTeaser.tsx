"use client";

/**
 * "Expert" teaser shown above the chat button. The open and close controls are
 * sibling buttons (not nested), so both work with the keyboard and screen readers.
 */
export default function ChatTeaser({
  onOpen,
  onClose,
}: {
  onOpen: () => void;
  onClose: () => void;
}) {
  return (
    <div className="legi-chat-teaser">
      <button type="button" className="legi-chat-teaser-open" onClick={onOpen}>
        <span className="legi-chat-teaser-name">
          <span className="legi-chat-teaser-dot" />
          LEGI Grande ექსპერტი
        </span>
        <span className="legi-chat-teaser-body">
          დაგეხმარებით Grande 800×400 ფილის რაოდენობის, პალეტებისა და ფასის დათვლაში!
        </span>
      </button>
      <button
        type="button"
        className="legi-chat-teaser-close"
        aria-label="დახურვა"
        onClick={onClose}
      >
        &times;
      </button>
    </div>
  );
}
