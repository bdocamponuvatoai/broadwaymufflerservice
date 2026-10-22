"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type MouseEvent } from "react";

import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "@/components/icons";
import { cx } from "@/components/ui";
import { projectCategories, projects } from "@/lib/content";

type Category = (typeof projectCategories)[number];

export function WorkGallery() {
  const [filter, setFilter] = useState<Category>("All work");
  const [current, setCurrent] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const visible = projects.filter((project) => filter === "All work" || project.category === filter);
  const project = visible[current] ?? visible[0];

  const open = (index: number, trigger: HTMLButtonElement) => {
    // Safari doesn't focus buttons on click, so remember the trigger for focus return.
    openerRef.current = trigger;
    setCurrent(index);
    dialogRef.current?.showModal();
  };

  const move = (step: number) => setCurrent((index) => (index + step + visible.length) % visible.length);

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
  };

  const onBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) dialogRef.current?.close();
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-2">
          {projectCategories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={filter === category}
              onClick={() => {
                setFilter(category);
                setCurrent(0);
              }}
              className={cx(
                "min-h-11 rounded-[3px] border px-4 font-display text-base font-semibold tracking-[0.04em] uppercase transition-colors",
                filter === category ? "border-ink bg-ink text-paper" : "border-line text-ink hover:border-ink",
              )}
            >
              {category}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="text-steel" data-testid="gallery-count">
          {visible.length} photo{visible.length === 1 ? "" : "s"}
        </p>
      </div>

      <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item, index) => (
          <li key={item.id} id={item.id} className="scroll-mt-28">
            <button
              type="button"
              onClick={(event) => open(index, event.currentTarget)}
              className="group block w-full rounded-[3px] text-left"
            >
              <span className="relative block aspect-[4/5] overflow-hidden rounded-[3px] bg-paper-deep">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </span>
              <span className="mt-4 block tag-label text-steel">{item.label}</span>
              <span className="mt-1 block font-display text-3xl font-bold tracking-[0.01em] uppercase">
                {item.title}
              </span>
              <span className="mt-1 block text-sm font-medium text-signal underline underline-offset-4">
                View larger
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-labelledby="gallery-title"
        onKeyDown={onKeyDown}
        onClick={onBackdropClick}
        onClose={() => openerRef.current?.focus()}
        className="on-dark m-auto w-[min(64rem,calc(100%-2rem))] max-w-none rounded-[3px] bg-ink p-0 text-paper"
      >
        {project && (
          <div className="grid md:grid-cols-[1.4fr_1fr]">
            <div className="relative aspect-square bg-ink-soft md:aspect-auto md:min-h-[32rem]">
              <Image
                key={project.id}
                src={project.image}
                alt={project.alt}
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <p className="tag-label text-paper/70">{project.label}</p>
                <button
                  type="button"
                  onClick={() => dialogRef.current?.close()}
                  className="-mt-2 -mr-2 inline-flex size-11 shrink-0 items-center justify-center rounded-[3px]"
                  autoFocus
                >
                  <CloseIcon className="size-6" />
                  <span className="sr-only">Close photo</span>
                </button>
              </div>
              <h2 id="gallery-title" className="mt-2 text-display text-4xl uppercase">
                {project.title}
              </h2>
              <p className="mt-4 text-paper/85">{project.description}</p>
              <p className="mt-4 text-sm text-paper/70">Photo from the shop’s public Yelp listing.</p>
              {visible.length > 1 && (
                <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                  <button
                    type="button"
                    onClick={() => move(-1)}
                    className="inline-flex size-11 items-center justify-center rounded-[3px] border border-ink-line hover:border-paper"
                  >
                    <ArrowLeftIcon className="size-5" />
                    <span className="sr-only">Previous photo</span>
                  </button>
                  <p className="text-paper/75" data-testid="gallery-counter">
                    {current + 1} / {visible.length}
                  </p>
                  <button
                    type="button"
                    onClick={() => move(1)}
                    className="inline-flex size-11 items-center justify-center rounded-[3px] border border-ink-line hover:border-paper"
                  >
                    <ArrowRightIcon className="size-5" />
                    <span className="sr-only">Next photo</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
