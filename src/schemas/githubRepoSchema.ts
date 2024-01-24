/**
 * Copyright (c) 2024 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import { z } from "zod";

const githubOwnerSchema = z.object({
	avatar_url: z.string(),
	gravatar_id: z.string(),
	url: z.string(),
	html_url: z.string(),
	followers_url: z.string(),
	following_url: z.string(),
	gists_url: z.string(),
	starred_url: z.string(),
	subscriptions_url: z.string(),
	organizations_url: z.string(),
	repos_url: z.string(),
});

export const githubRepoSchema = z.object({
	id: z.number(),
	node_id: z.string(),
	private: z.boolean(),
	disabled: z.boolean(),
	archived: z.boolean(),
	visibility: z.string(),

	name: z.string(),
	full_name: z.string(),
	description: z.string().nullable().optional(),

	owner: githubOwnerSchema,

	html_url: z.string(),
	url: z.string(),

	fork: z.boolean(),
	forks: z.number(),
	forks_count: z.number(),
	stargazers_count: z.number(),
	watchers: z.number(),
	watchers_count: z.number(),

	language: z.string().nullable().optional(),

	created_at: z.string(),
	updated_at: z.string(),
	pushed_at: z.string(),
	git_url: z.string(),

	homepage: z.string().nullable().optional(),
	size: z.number(),

	topics: z.array(z.unknown()),
	default_branch: z.string(),
});

export const githubReposSchema = z.array(githubRepoSchema);

export type GithubRepos = z.infer<typeof githubReposSchema>;
export type GithubRepo = z.infer<typeof githubRepoSchema>;
