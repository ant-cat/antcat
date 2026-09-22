declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"2008-05-13-so-here-we-go.md": {
	id: "2008-05-13-so-here-we-go.md";
  slug: "so-here-we-go";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2008-05-15-the-trip-that-took-5-years-to-happen.md": {
	id: "2008-05-15-the-trip-that-took-5-years-to-happen.md";
  slug: "the-trip-that-took-5-years-to-happen";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2008-05-25-well-that-was-quick.md": {
	id: "2008-05-25-well-that-was-quick.md";
  slug: "well-that-was-quick";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2008-06-08-zohanwhat-a-guy.md": {
	id: "2008-06-08-zohanwhat-a-guy.md";
  slug: "zohanwhat-a-guy";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2008-06-17-bud-light100-full-of-poop.md": {
	id: "2008-06-17-bud-light100-full-of-poop.md";
  slug: "bud-light100-full-of-poop";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2008-06-26-slip-and-slideswhat-else-should-a-club-have.md": {
	id: "2008-06-26-slip-and-slideswhat-else-should-a-club-have.md";
  slug: "slip-and-slideswhat-else-should-a-club-have";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2008-08-18-i-disappeared.md": {
	id: "2008-08-18-i-disappeared.md";
  slug: "i-disappeared";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2008-09-16-yay-we-are-up-and-running.md": {
	id: "2008-09-16-yay-we-are-up-and-running.md";
  slug: "yay-we-are-up-and-running";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2008-10-15-so-is-it-just-me-or-is-it-out-of-control.md": {
	id: "2008-10-15-so-is-it-just-me-or-is-it-out-of-control.md";
  slug: "so-is-it-just-me-or-is-it-out-of-control";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2008-10-16-jacksonville-florida-is-going-to-rock.md": {
	id: "2008-10-16-jacksonville-florida-is-going-to-rock.md";
  slug: "jacksonville-florida-is-going-to-rock";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2008-10-16-sometimes-you-need-aladdin.md": {
	id: "2008-10-16-sometimes-you-need-aladdin.md";
  slug: "sometimes-you-need-aladdin";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2008-10-29-concert-revew-the-faint.md": {
	id: "2008-10-29-concert-revew-the-faint.md";
  slug: "concert-revew-the-faint";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2008-11-04-portugal-the-man-earl-greyhound-wintersleep-jacksonville-florida-102408.md": {
	id: "2008-11-04-portugal-the-man-earl-greyhound-wintersleep-jacksonville-florida-102408.md";
  slug: "portugal-the-man-earl-greyhound-wintersleep-jacksonville-florida-102408";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2008-12-18-holy-cowtime-has-flownyear-end-update.md": {
	id: "2008-12-18-holy-cowtime-has-flownyear-end-update.md";
  slug: "holy-cowtime-has-flownyear-end-update";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-01-23-ok-so-ended-weird.md": {
	id: "2009-01-23-ok-so-ended-weird.md";
  slug: "ok-so-ended-weird";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-02-12-really.md": {
	id: "2009-02-12-really.md";
  slug: "really";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-02-15-how-is-this-a-compliment.md": {
	id: "2009-02-15-how-is-this-a-compliment.md";
  slug: "how-is-this-a-compliment";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-02-19-sweet-stuff.md": {
	id: "2009-02-19-sweet-stuff.md";
  slug: "sweet-stuff";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-03-24-back-from-bogota-colombia.md": {
	id: "2009-03-24-back-from-bogota-colombia.md";
  slug: "back-from-bogota-colombia";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-03-24-easter-is-great.md": {
	id: "2009-03-24-easter-is-great.md";
  slug: "easter-is-great";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-05-08-i-guess-we-live.md": {
	id: "2009-05-08-i-guess-we-live.md";
  slug: "i-guess-we-live";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-05-08-it-brings-the-lols.md": {
	id: "2009-05-08-it-brings-the-lols.md";
  slug: "it-brings-the-lols";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-06-12-slip-and-slides-what-else-should-a-club-have-part-2.md": {
	id: "2009-06-12-slip-and-slides-what-else-should-a-club-have-part-2.md";
  slug: "slip-and-slides-what-else-should-a-club-have-part-2";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-06-14-a-great-site.md": {
	id: "2009-06-14-a-great-site.md";
  slug: "a-great-site";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-06-14-dont-do-it.md": {
	id: "2009-06-14-dont-do-it.md";
  slug: "dont-do-it";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-06-26-oh-marmaduke.md": {
	id: "2009-06-26-oh-marmaduke.md";
  slug: "oh-marmaduke";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-07-10-best-candy-in-the-world.md": {
	id: "2009-07-10-best-candy-in-the-world.md";
  slug: "best-candy-in-the-world";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-07-10-i-am.md": {
	id: "2009-07-10-i-am.md";
  slug: "i-am";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-07-15-proud-to-be-a-grown-up.md": {
	id: "2009-07-15-proud-to-be-a-grown-up.md";
  slug: "proud-to-be-a-grown-up";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-08-03-a-couple-different-things.md": {
	id: "2009-08-03-a-couple-different-things.md";
  slug: "a-couple-different-things";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-08-18-cedar-point-2009.md": {
	id: "2009-08-18-cedar-point-2009.md";
  slug: "cedar-point-2009";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-08-20-tal-2003.md": {
	id: "2009-08-20-tal-2003.md";
  slug: "tal-2003";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-08-26-last-night-adventures.md": {
	id: "2009-08-26-last-night-adventures.md";
  slug: "last-night-adventures";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-09-02-moron.md": {
	id: "2009-09-02-moron.md";
  slug: "moron";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-09-03-it-has-gone-from-love-to-hate.md": {
	id: "2009-09-03-it-has-gone-from-love-to-hate.md";
  slug: "it-has-gone-from-love-to-hate";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-09-11-a-little-anticlimatic-forgotten-warrior.md": {
	id: "2009-09-11-a-little-anticlimatic-forgotten-warrior.md";
  slug: "a-little-anticlimatic-forgotten-warrior";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-09-15-stalking-cat.md": {
	id: "2009-09-15-stalking-cat.md";
  slug: "stalking-cat";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-09-16-a-letter-to-mr-swayze.md": {
	id: "2009-09-16-a-letter-to-mr-swayze.md";
  slug: "a-letter-to-mr-swayze";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-09-17-taverna.md": {
	id: "2009-09-17-taverna.md";
  slug: "taverna";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-09-22-two-shows-i-really-want-to-see-join-me.md": {
	id: "2009-09-22-two-shows-i-really-want-to-see-join-me.md";
  slug: "two-shows-i-really-want-to-see-join-me";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-09-29-and-it-begins.md": {
	id: "2009-09-29-and-it-begins.md";
  slug: "and-it-begins";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-10-06-nothing-can-be-more-frustrating.md": {
	id: "2009-10-06-nothing-can-be-more-frustrating.md";
  slug: "nothing-can-be-more-frustrating";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-10-12-when-you-all-of-sudden-realize-you-are-the-problem.md": {
	id: "2009-10-12-when-you-all-of-sudden-realize-you-are-the-problem.md";
  slug: "when-you-all-of-sudden-realize-you-are-the-problem";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-10-14-oh-man.md": {
	id: "2009-10-14-oh-man.md";
  slug: "oh-man";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-10-27-when-the-audience-knows-more-than-the-actor.md": {
	id: "2009-10-27-when-the-audience-knows-more-than-the-actor.md";
  slug: "when-the-audience-knows-more-than-the-actor";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-11-02-daft-punk-costume.md": {
	id: "2009-11-02-daft-punk-costume.md";
  slug: "daft-punk-costume";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2009-11-16-dos-gatos.md": {
	id: "2009-11-16-dos-gatos.md";
  slug: "dos-gatos";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2010-02-02-and-now-it-is-finished.md": {
	id: "2010-02-02-and-now-it-is-finished.md";
  slug: "and-now-it-is-finished";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2010-02-04-country-road-take-me-home-to-the-place.md": {
	id: "2010-02-04-country-road-take-me-home-to-the-place.md";
  slug: "country-road-take-me-home-to-the-place";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2010-03-24-people-stock.md": {
	id: "2010-03-24-people-stock.md";
  slug: "people-stock";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2010-03-29-15-years-crammed-into-1.md": {
	id: "2010-03-29-15-years-crammed-into-1.md";
  slug: "15-years-crammed-into-1";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2010-04-13-smoky-the-bear-says-only-you-can-make-you-happy.md": {
	id: "2010-04-13-smoky-the-bear-says-only-you-can-make-you-happy.md";
  slug: "smoky-the-bear-says-only-you-can-make-you-happy";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2010-05-14-lots-of-great-change.md": {
	id: "2010-05-14-lots-of-great-change.md";
  slug: "lots-of-great-change";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2010-06-08-just-in-time-for-the-nba-finals-if-you-want-to-be-moved.md": {
	id: "2010-06-08-just-in-time-for-the-nba-finals-if-you-want-to-be-moved.md";
  slug: "just-in-time-for-the-nba-finals-if-you-want-to-be-moved";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2010-07-14-kind-of-wish.md": {
	id: "2010-07-14-kind-of-wish.md";
  slug: "kind-of-wish";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2010-07-15-daft-punk-thomas-helmet-for-sale.md": {
	id: "2010-07-15-daft-punk-thomas-helmet-for-sale.md";
  slug: "daft-punk-thomas-helmet-for-sale";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2010-07-15-i-couldnt-be-louder.md": {
	id: "2010-07-15-i-couldnt-be-louder.md";
  slug: "i-couldnt-be-louder";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2010-07-19-the-wizardy-world.md": {
	id: "2010-07-19-the-wizardy-world.md";
  slug: "the-wizardy-world";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2010-07-20-corporate-crap.md": {
	id: "2010-07-20-corporate-crap.md";
  slug: "corporate-crap";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2010-07-21-returning.md": {
	id: "2010-07-21-returning.md";
  slug: "returning";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2010-07-22-hard-work.md": {
	id: "2010-07-22-hard-work.md";
  slug: "hard-work";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2010-08-12-a-wrong-view.md": {
	id: "2010-08-12-a-wrong-view.md";
  slug: "a-wrong-view";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2010-08-17-smokies-do-over.md": {
	id: "2010-08-17-smokies-do-over.md";
  slug: "smokies-do-over";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2010-08-24-oh-savannah.md": {
	id: "2010-08-24-oh-savannah.md";
  slug: "oh-savannah";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2010-10-12-this-just-in-this-blog-has-been-updated.md": {
	id: "2010-10-12-this-just-in-this-blog-has-been-updated.md";
  slug: "this-just-in-this-blog-has-been-updated";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2010-10-14-personal-stories.md": {
	id: "2010-10-14-personal-stories.md";
  slug: "personal-stories";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2010-10-27-recent-cartoons.md": {
	id: "2010-10-27-recent-cartoons.md";
  slug: "recent-cartoons";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2010-10-29-october-2010-smoky-mountains-trip-pictures.md": {
	id: "2010-10-29-october-2010-smoky-mountains-trip-pictures.md";
  slug: "october-2010-smoky-mountains-trip-pictures";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2010-11-02-my-motorcycle-for-sale-suzuki-bandit.md": {
	id: "2010-11-02-my-motorcycle-for-sale-suzuki-bandit.md";
  slug: "my-motorcycle-for-sale-suzuki-bandit";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2011-01-18-new-chapter.md": {
	id: "2011-01-18-new-chapter.md";
  slug: "new-chapter";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2011-02-02-goodbye-to-zoozical-hello-to-catknees.md": {
	id: "2011-02-02-goodbye-to-zoozical-hello-to-catknees.md";
  slug: "goodbye-to-zoozical-hello-to-catknees";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2011-02-14-happy-valentines-day.md": {
	id: "2011-02-14-happy-valentines-day.md";
  slug: "happy-valentines-day";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2011-05-24-the-tron-bachelor-party-video.md": {
	id: "2011-05-24-the-tron-bachelor-party-video.md";
  slug: "the-tron-bachelor-party-video";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2011-10-25-the-next-2.md": {
	id: "2011-10-25-the-next-2.md";
  slug: "the-next-2";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2012-01-04-the-pinewood-derby-2011.md": {
	id: "2012-01-04-the-pinewood-derby-2011.md";
  slug: "the-pinewood-derby-2011";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-03-05-let-the-shenanigans-begin.md": {
	id: "2013-03-05-let-the-shenanigans-begin.md";
  slug: "let-the-shenanigans-begin";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-03-06-ill-manage-2.md": {
	id: "2013-03-06-ill-manage-2.md";
  slug: "ill-manage-2";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-03-07-poo-tee-weet.md": {
	id: "2013-03-07-poo-tee-weet.md";
  slug: "poo-tee-weet";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-03-08-olly-moss.md": {
	id: "2013-03-08-olly-moss.md";
  slug: "olly-moss";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-03-09-my-white-whale.md": {
	id: "2013-03-09-my-white-whale.md";
  slug: "my-white-whale";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-03-10-short-but-sweeet.md": {
	id: "2013-03-10-short-but-sweeet.md";
  slug: "short-but-sweeet";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-03-11-moving-to-the-country-going-to-eat-myself-some-peaches.md": {
	id: "2013-03-11-moving-to-the-country-going-to-eat-myself-some-peaches.md";
  slug: "moving-to-the-country-going-to-eat-myself-some-peaches";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-03-12-the-innovative-chronicles-001-sittin-on-the-porch-eating-sausage-sippin-on-a-cup.md": {
	id: "2013-03-12-the-innovative-chronicles-001-sittin-on-the-porch-eating-sausage-sippin-on-a-cup.md";
  slug: "the-innovative-chronicles-001-sittin-on-the-porch-eating-sausage-sippin-on-a-cup";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-03-13-self-obsessed.md": {
	id: "2013-03-13-self-obsessed.md";
  slug: "self-obsessed";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-03-16-obtuse.md": {
	id: "2013-03-16-obtuse.md";
  slug: "obtuse";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-03-18-diy-youtube-2.md": {
	id: "2013-03-18-diy-youtube-2.md";
  slug: "diy-youtube-2";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-03-18-i-lost-my-marbles-revisited.md": {
	id: "2013-03-18-i-lost-my-marbles-revisited.md";
  slug: "i-lost-my-marbles-revisited";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-03-19-and-it-was-fun-fun-fun.md": {
	id: "2013-03-19-and-it-was-fun-fun-fun.md";
  slug: "and-it-was-fun-fun-fun";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-03-20-the-humaninternet-experience.md": {
	id: "2013-03-20-the-humaninternet-experience.md";
  slug: "the-humaninternet-experience";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-03-21-yes-but-it-is-a-lion-2.md": {
	id: "2013-03-21-yes-but-it-is-a-lion-2.md";
  slug: "yes-but-it-is-a-lion-2";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-03-22-25-are-brilliant-ideas.md": {
	id: "2013-03-22-25-are-brilliant-ideas.md";
  slug: "25-are-brilliant-ideas";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-03-24-fix-it-yourself.md": {
	id: "2013-03-24-fix-it-yourself.md";
  slug: "fix-it-yourself";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-03-25-nonmonetarychange.md": {
	id: "2013-03-25-nonmonetarychange.md";
  slug: "nonmonetarychange";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-03-26-take-away-shows.md": {
	id: "2013-03-26-take-away-shows.md";
  slug: "take-away-shows";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-03-28-too-many-ideas.md": {
	id: "2013-03-28-too-many-ideas.md";
  slug: "too-many-ideas";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-03-29-fruit-on-the-bottom-hope-on-top.md": {
	id: "2013-03-29-fruit-on-the-bottom-hope-on-top.md";
  slug: "fruit-on-the-bottom-hope-on-top";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-03-30-always-be-learning.md": {
	id: "2013-03-30-always-be-learning.md";
  slug: "always-be-learning";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-04-01-its-april-fools.md": {
	id: "2013-04-01-its-april-fools.md";
  slug: "its-april-fools";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-04-03-in-the-shadow-of-hanks.md": {
	id: "2013-04-03-in-the-shadow-of-hanks.md";
  slug: "in-the-shadow-of-hanks";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-04-06-i-got-99-posts-plus-this-one.md": {
	id: "2013-04-06-i-got-99-posts-plus-this-one.md";
  slug: "i-got-99-posts-plus-this-one";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-04-07-no-news-is-good-news.md": {
	id: "2013-04-07-no-news-is-good-news.md";
  slug: "no-news-is-good-news";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-04-08-volume-11-vs-silence.md": {
	id: "2013-04-08-volume-11-vs-silence.md";
  slug: "volume-11-vs-silence";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-04-14-getting-old.md": {
	id: "2013-04-14-getting-old.md";
  slug: "getting-old";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-04-15-a-moment-of-reverence.md": {
	id: "2013-04-15-a-moment-of-reverence.md";
  slug: "a-moment-of-reverence";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-04-16-hard-day.md": {
	id: "2013-04-16-hard-day.md";
  slug: "hard-day";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-04-17-disco-is-back.md": {
	id: "2013-04-17-disco-is-back.md";
  slug: "disco-is-back";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-04-29-a-bird-wants-to-be-a-cat.md": {
	id: "2013-04-29-a-bird-wants-to-be-a-cat.md";
  slug: "a-bird-wants-to-be-a-cat";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-05-07-my-brown-mm.md": {
	id: "2013-05-07-my-brown-mm.md";
  slug: "my-brown-mm";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-05-08-the-spam-fetching-pup.md": {
	id: "2013-05-08-the-spam-fetching-pup.md";
  slug: "the-spam-fetching-pup";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-05-13-paft-dunk.md": {
	id: "2013-05-13-paft-dunk.md";
  slug: "paft-dunk";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-05-16-well-priced-luxury-check.md": {
	id: "2013-05-16-well-priced-luxury-check.md";
  slug: "well-priced-luxury-check";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-06-07-my-hope-for-a-full-phone-future.md": {
	id: "2013-06-07-my-hope-for-a-full-phone-future.md";
  slug: "my-hope-for-a-full-phone-future";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-06-17-swimming-or-as-i-call-it-not-drowning.md": {
	id: "2013-06-17-swimming-or-as-i-call-it-not-drowning.md";
  slug: "swimming-or-as-i-call-it-not-drowning";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-06-19-youve-got-20-power.md": {
	id: "2013-06-19-youve-got-20-power.md";
  slug: "youve-got-20-power";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-07-20-quick-hacktip-socket-wrench.md": {
	id: "2013-07-20-quick-hacktip-socket-wrench.md";
  slug: "quick-hacktip-socket-wrench";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-08-07-cheat.md": {
	id: "2013-08-07-cheat.md";
  slug: "cheat";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-08-19-tales-of-a-po-week-1-gut-check.md": {
	id: "2013-08-19-tales-of-a-po-week-1-gut-check.md";
  slug: "tales-of-a-po-week-1-gut-check";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-08-22-leaders-pour-concrete.md": {
	id: "2013-08-22-leaders-pour-concrete.md";
  slug: "leaders-pour-concrete";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-08-27-tales-of-a-po-week-2-dating.md": {
	id: "2013-08-27-tales-of-a-po-week-2-dating.md";
  slug: "tales-of-a-po-week-2-dating";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-09-24-tales-of-a-po-week-3-and-4-dont-break-the-chain.md": {
	id: "2013-09-24-tales-of-a-po-week-3-and-4-dont-break-the-chain.md";
  slug: "tales-of-a-po-week-3-and-4-dont-break-the-chain";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-09-28-error-dirty-laundry.md": {
	id: "2013-09-28-error-dirty-laundry.md";
  slug: "error-dirty-laundry";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-10-07-tales-of-a-po-week-5-band-aids-2.md": {
	id: "2013-10-07-tales-of-a-po-week-5-band-aids-2.md";
  slug: "tales-of-a-po-week-5-band-aids-2";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-10-14-dirty-deeds-thunder-cheeks.md": {
	id: "2013-10-14-dirty-deeds-thunder-cheeks.md";
  slug: "dirty-deeds-thunder-cheeks";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-10-14-tales-of-a-po-week-6-ask-for-help.md": {
	id: "2013-10-14-tales-of-a-po-week-6-ask-for-help.md";
  slug: "tales-of-a-po-week-6-ask-for-help";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-10-20-pasting-2.md": {
	id: "2013-10-20-pasting-2.md";
  slug: "pasting-2";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-10-21-okinawa-2.md": {
	id: "2013-10-21-okinawa-2.md";
  slug: "okinawa-2";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-10-25-tales-of-a-po-week-7-hacked-growth-hacked.md": {
	id: "2013-10-25-tales-of-a-po-week-7-hacked-growth-hacked.md";
  slug: "tales-of-a-po-week-7-hacked-growth-hacked";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-10-27-a-letter-to-enterprise-product-development.md": {
	id: "2013-10-27-a-letter-to-enterprise-product-development.md";
  slug: "a-letter-to-enterprise-product-development";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2013-12-16-no-i-agree.md": {
	id: "2013-12-16-no-i-agree.md";
  slug: "no-i-agree";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2014-03-01-thirty-one.md": {
	id: "2014-03-01-thirty-one.md";
  slug: "thirty-one";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2014-05-19-this-world-is-a-great-wiggly-affair-v1-2014.md": {
	id: "2014-05-19-this-world-is-a-great-wiggly-affair-v1-2014.md";
  slug: "this-world-is-a-great-wiggly-affair-v1-2014";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2017-07-15-this-world-is-a-great-wiggly-affair-v2-2017.md": {
	id: "2017-07-15-this-world-is-a-great-wiggly-affair-v2-2017.md";
  slug: "this-world-is-a-great-wiggly-affair-v2-2017";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2018-01-01-damn-stoked.md": {
	id: "2018-01-01-damn-stoked.md";
  slug: "damn-stoked";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2018-01-14-1964-2.md": {
	id: "2018-01-14-1964-2.md";
  slug: "1964-2";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2018-01-21-winded-by-design-sprints.md": {
	id: "2018-01-21-winded-by-design-sprints.md";
  slug: "winded-by-design-sprints";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2018-02-02-podcast-monday-morning-mimosas.md": {
	id: "2018-02-02-podcast-monday-morning-mimosas.md";
  slug: "podcast-monday-morning-mimosas";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2018-03-10-lunch-and-learn-virtual-reality-with-denvr.md": {
	id: "2018-03-10-lunch-and-learn-virtual-reality-with-denvr.md";
  slug: "lunch-and-learn-virtual-reality-with-denvr";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2018-04-21-east-to-west-one-year-later.md": {
	id: "2018-04-21-east-to-west-one-year-later.md";
  slug: "east-to-west-one-year-later";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2022-02-02-ready-player-two-fun-read-a-bit-cheese.md": {
	id: "2022-02-02-ready-player-two-fun-read-a-bit-cheese.md";
  slug: "ready-player-two-fun-read-a-bit-cheese";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2022-02-13-letters-to-lu-luca.md": {
	id: "2022-02-13-letters-to-lu-luca.md";
  slug: "letters-to-lu-luca";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2022-04-22-growth-and-learning-skillpath-management-leadership-skills-for-first-time-superv.md": {
	id: "2022-04-22-growth-and-learning-skillpath-management-leadership-skills-for-first-time-superv.md";
  slug: "growth-and-learning-skillpath-management-leadership-skills-for-first-time-superv";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2022-06-15-dogs-and-tools.md": {
	id: "2022-06-15-dogs-and-tools.md";
  slug: "dogs-and-tools";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2022-06-30-tools-2-all-the-hats.md": {
	id: "2022-06-30-tools-2-all-the-hats.md";
  slug: "tools-2-all-the-hats";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2022-08-29-notebook-aug-2021-to-aug-2022.md": {
	id: "2022-08-29-notebook-aug-2021-to-aug-2022.md";
  slug: "notebook-aug-2021-to-aug-2022";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2022-09-03-holy-crap-finally-done-high-impact-management.md": {
	id: "2022-09-03-holy-crap-finally-done-high-impact-management.md";
  slug: "holy-crap-finally-done-high-impact-management";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2022-09-06-tools-3.md": {
	id: "2022-09-06-tools-3.md";
  slug: "tools-3";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2023-01-17-letters-to-lu-today-you-played.md": {
	id: "2023-01-17-letters-to-lu-today-you-played.md";
  slug: "letters-to-lu-today-you-played";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2023-02-06-the-scheckles.md": {
	id: "2023-02-06-the-scheckles.md";
  slug: "the-scheckles";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2023-02-09-letters-to-lu-accepted-and-letting-go.md": {
	id: "2023-02-09-letters-to-lu-accepted-and-letting-go.md";
  slug: "letters-to-lu-accepted-and-letting-go";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2023-04-11-32-doublings.md": {
	id: "2023-04-11-32-doublings.md";
  slug: "32-doublings";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2023-07-31-speed-of-collaboration-in-the-days-of-email-vs-teams-slack.md": {
	id: "2023-07-31-speed-of-collaboration-in-the-days-of-email-vs-teams-slack.md";
  slug: "speed-of-collaboration-in-the-days-of-email-vs-teams-slack";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2024-02-19-notebook-aug-2022-to-dec-2023.md": {
	id: "2024-02-19-notebook-aug-2022-to-dec-2023.md";
  slug: "notebook-aug-2022-to-dec-2023";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2025-07-14-that-time-we-ran-a-vr-nonprofit.md": {
	id: "2025-07-14-that-time-we-ran-a-vr-nonprofit.md";
  slug: "that-time-we-ran-a-vr-nonprofit";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
