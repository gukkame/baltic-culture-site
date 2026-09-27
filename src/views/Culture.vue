<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { useLocale } from "../composables/useLocale";
import { contentByCountry, isCountry } from "../data";
import CountrySymbol from "../components/CountrySymbol.vue";
import ItemCardMedia from "../components/ItemCardMedia.vue";
import CornerHeroImage from "../components/CornerHeroImage.vue";
import { galleryByCountry } from "../data/credits";
import { countryPath } from "../router/paths";

const props = defineProps<{
	country: string;
}>();

const { locale, t } = useLocale();

const validCountry = computed(() =>
	isCountry(props.country) ? props.country : undefined,
);
const items = computed(() =>
	validCountry.value ? contentByCountry[validCountry.value] : [],
);

type Filter = "all" | "dance" | "song" | "image";
const activeFilter = ref<Filter>("all");

const galleryImages = computed(() =>
	validCountry.value ? galleryByCountry[validCountry.value] : [],
);

// Hide a category filter when the country has nothing in it (e.g. Latvia has no songs yet).
const hasDances = computed(() =>
	items.value.some((item) => item.category === "dance"),
);
const hasSongs = computed(() =>
	items.value.some((item) => item.category === "song"),
);
const hasImages = computed(() => galleryImages.value.length > 0);

// "All" covers dances and songs together, so it only means something when the country has both.
const showAll = computed(() => hasDances.value && hasSongs.value);

const filters = computed(() =>
	[
		{
			id: "all" as const,
			label: t("culture.filters.all"),
			shown: showAll.value,
		},
		{
			id: "dance" as const,
			label: t("culture.dances"),
			shown: hasDances.value,
		},
		{
			id: "song" as const,
			label: t("culture.songs"),
			shown: hasSongs.value,
		},
		{
			id: "image" as const,
			label: t("culture.images"),
			shown: hasImages.value,
		},
	].filter((filter) => filter.shown),
);

// The component is reused across countries, so don't keep a filter the new country lacks.
watch(validCountry, () => {
	activeFilter.value = "all";
});

// Keep the picked filter while this country offers it, otherwise fall back to the first one shown.
const currentFilter = computed<Filter>(() => {
	const available = filters.value.map((filter) => filter.id);
	return available.includes(activeFilter.value)
		? activeFilter.value
		: (available[0] ?? "all");
});

const filteredItems = computed(() => {
	if (currentFilter.value === "all") return items.value;
	return items.value.filter((item) => item.category === currentFilter.value);
});

// Images are their own group: shown only when the Images filter is picked, never under "All".
const showImages = computed(
	() => hasImages.value && currentFilter.value === "image",
);

// Card currently hovered/focused; only that card plays its video preview.
const previewId = ref<string>();

// Top-right corner: a slideshow of the country's gallery photos (credited on the About page).
const heroSlides = computed(() =>
	validCountry.value
		? galleryByCountry[validCountry.value].map((image) => ({
				src: image.src,
				alt: image.title[locale.value],
			}))
		: [],
);
</script>

<template>
	<section v-if="!validCountry" class="mx-auto max-w-5xl px-4 py-12">
		<h1 class="font-serif text-3xl text-ink">
			{{ t("culture.notFoundTitle") }}
		</h1>
		<p class="mt-2 text-ink-light">{{ t("culture.notFoundBody") }}</p>
		<RouterLink
			to="/"
			class="mt-6 inline-block text-terracotta-dark underline-offset-4 transition-colors duration-150 hover:text-terracotta hover:underline">
			{{ t("culture.backHome") }}
		</RouterLink>
	</section>

	<section v-else class="relative">
		<div class="relative mx-auto">
			<CornerHeroImage :images="heroSlides" />

			<div
				class="mx-auto min-h-[clamp(140px,22vw,220px)] max-w-6xl px-4 pb-2 pt-10 sm:min-h-[clamp(180px,20vw,260px)] sm:px-6 sm:pt-16 lg:min-h-[clamp(320px,29vw,520px)] lg:px-8">
				<div class="max-w-[60%] sm:max-w-[60%] lg:max-w-md">
					<RouterLink
						to="/"
						class="inline-flex items-center gap-1 text-sm text-ink-light underline-offset-4 transition-colors duration-150 hover:text-terracotta-dark hover:underline">
						← {{ t("culture.backHome") }}
					</RouterLink>

					<div class="mt-4 flex items-center gap-2 text-ink">
						<CountrySymbol :country="validCountry" class="size-5" />
						<span class="font-medium">{{
							t(`common.${validCountry}`)
						}}</span>
					</div>

					<h1
						class="mt-3 font-serif text-2xl leading-tight text-ink sm:text-3xl lg:text-4xl">
						{{ t(`culture.pages.${validCountry}.headline`) }}
					</h1>
					<p
						class="mt-4 max-w-md text-sm text-ink-light sm:text-base">
						{{ t(`culture.pages.${validCountry}.description`) }}
					</p>
				</div>
			</div>
		</div>

		<div class="mx-auto mt-8 max-w-6xl px-4 pb-8 sm:px-6 sm:pb-12 lg:px-8">
			<div
				role="group"
				:aria-label="t('culture.filters.all')"
				class="flex flex-wrap gap-2">
				<button
					v-for="filter in filters"
					:key="filter.id"
					type="button"
					:aria-pressed="currentFilter === filter.id"
					class="rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150"
					:class="
						currentFilter === filter.id
							? 'bg-ink text-parchment hover:bg-ink-light'
							: 'bg-parchment-dark text-ink-light hover:bg-parchment-darker hover:text-ink'
					"
					@click="activeFilter = filter.id">
					{{ filter.label }}
				</button>
			</div>

			<ul
				v-if="filteredItems.length"
				class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<li v-for="item in filteredItems" :key="item.id">
					<RouterLink
						:to="countryPath(validCountry, item.id)"
						class="group flex h-full flex-col overflow-hidden rounded-2xl bg-parchment-light shadow-paper ring-1 ring-parchment-dark transition duration-300 ease-out hover:-translate-y-1.5 hover:bg-parchment hover:shadow-paper-hover hover:ring-terracotta/30 focus-visible:-translate-y-1.5 focus-visible:shadow-paper-hover"
						@mouseenter="previewId = item.id"
						@mouseleave="previewId = undefined"
						@focus="previewId = item.id"
						@blur="previewId = undefined">
						<ItemCardMedia
							:item="item"
							:active="previewId === item.id" />
						<div class="flex flex-1 flex-col gap-1 p-4">
							<h3
								class="font-serif text-lg text-ink transition-colors duration-200 group-hover:text-terracotta-dark group-focus-visible:text-terracotta-dark">
								{{ item.title[locale] }}
							</h3>
							<p class="text-xs text-ink-light">
								{{ t(`item.category.${item.category}`) }} ·
								{{ t(`common.${validCountry}`) }}
							</p>
							<p class="mt-1 text-sm text-ink-light">
								{{ item.tagline[locale] }}
							</p>
						</div>
					</RouterLink>
				</li>
			</ul>

			<section
				v-if="showImages"
				class="mt-6"
				aria-labelledby="culture-gallery">
				<h2 id="culture-gallery" class="sr-only">
					{{ t("culture.images") }}
				</h2>
				<ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					<li v-for="image in galleryImages" :key="image.src">
						<figure
							class="overflow-hidden rounded-2xl bg-parchment-light shadow-paper ring-1 ring-parchment-dark">
							<a
								:href="image.src"
								target="_blank"
								rel="noopener"
								class="block aspect-[4/3] overflow-hidden bg-parchment-dark">
								<img
									:src="image.src"
									:alt="image.title[locale]"
									loading="lazy"
									decoding="async"
									class="h-full w-full object-cover transition duration-300 ease-out hover:scale-105" />
							</a>
							<figcaption class="p-4">
								<p class="font-serif text-lg text-ink">
									{{ image.title[locale] }}
								</p>
								<p
									v-if="image.description"
									class="mt-2 text-sm leading-relaxed text-ink-light">
									{{ image.description[locale] }}
								</p>
							</figcaption>
						</figure>
					</li>
				</ul>
			</section>
		</div>
	</section>
</template>
