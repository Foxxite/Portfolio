/**
 * Copyright (c) 2025 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import { Octokit, RestEndpointMethodTypes } from "@octokit/rest";

import { create } from "zustand";

const octokit = new Octokit();

type Repo = RestEndpointMethodTypes["repos"]["listForUser"]["response"]["data"][number];

interface GithubStore {
	repoCount: number;
	repos: Repo[];

	languages: Set<string>;
	languagesCount: Map<string, number>;

	fetched: boolean;

	setRepos: (repos: Repo[]) => void;
	setRepoCount: (repoCount: number) => void;

	fetch: () => void;
}

const useGithubStore = create<GithubStore>((set) => ({
	repoCount: 0,
	repos: [],

	languages: new Set(),
	languagesCount: new Map(),

	fetched: false,

	setRepos: (repos) => set({ repos }),
	setRepoCount: (repoCount) => set({ repoCount }),

	fetch: async () => {
		// Return if fetched
		if (useGithubStore.getState().fetched) return;

		const { data: repo_data } = await octokit.repos.listForUser({
			username: "Foxxite",
			sort: "created",
			direction: "desc",
			per_page: 100,
		});

		const filteredData = repo_data.filter((repo) => !repo.private && !repo.fork && repo.description);

		set({
			repoCount: filteredData.length,
			repos: filteredData,
			languages: new Set(
				filteredData.map((repo) => repo.language).filter((language): language is string => !!language)
			),
			languagesCount: filteredData
				.map((repo) => repo.language)
				.filter((language): language is string => !!language)
				.reduce((acc, language) => acc.set(language, (acc.get(language) || 0) + 1), new Map<string, number>()),
			fetched: true,
		});
	},
}));

// Call the fetch function to load the data when the store is created
useGithubStore.getState().fetch();

export default useGithubStore;
