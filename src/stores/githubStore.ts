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

	fetched: boolean;

	setRepos: (repos: Repo[]) => void;
	setRepoCount: (repoCount: number) => void;

	fetch: () => void;
}

const useGithubStore = create<GithubStore>((set) => ({
	repoCount: 0,
	repos: [],

	languages: new Set(),

	fetched: false,

	setRepos: (repos) => set({ repos }),
	setRepoCount: (repoCount) => set({ repoCount }),

	fetch: async () => {
		// Return if fetched
		if (useGithubStore.getState().fetched) return;

		const { data } = await octokit.repos.listForUser({
			username: "Foxxite",
			sort: "created",
			direction: "desc",
			per_page: 9999,
		});

		const filteredData = data.filter((repo) => !repo.private && !repo.fork && repo.description);

		set({
			repoCount: filteredData.length,
			repos: filteredData,
			languages: new Set(
				filteredData.map((repo) => repo.language).filter((language): language is string => !!language)
			),
			fetched: true,
		});
	},
}));

export default useGithubStore;
