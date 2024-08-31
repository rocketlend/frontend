import { classNames } from "../functions/classNameJoin";
import { ForwardRefExoticComponent, SVGProps } from "react";

type CardProps = {
  title: string;
  content: string[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconForeground: string;
  iconBackground: string;
}

const Card = ({
  card
}: {
  card: CardProps
}) => {
  return (
    <>
      <div>
        <span
          className={classNames(
            card.iconBackground,
            card.iconForeground,
            "inline-flex rounded-lg p-3 ring-4 ring-white"
          )}
        >
        <card.icon aria-hidden="true" className="h-6 w-6"/>
        </span>
      </div>
      <div className="mt-8">
        <h3 className="text-base font-semibold leading-6 text-zinc-900">
          {card.title}
        </h3>
        {card.content.map((sentence, i) => {
          return (
            <p key={i} className="mt-2 text-sm text-zinc-500">
              {sentence}
            </p>
          );
        })}
      </div>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-6 text-zinc-300 group-hover:text-zinc-400"
      >
        <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
          <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
        </svg>
      </span>
    </>
  );
};

export default Card;
