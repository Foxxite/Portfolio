/**
 * /*
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import "../../i18n/config";

import axios from "axios";
import { compareDesc } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";

import { GithubRepo, GithubRepos, githubReposSchema } from "../../schemas/githubRepoSchema";
import styles from "./Repos.module.scss";
import Repo from "./Repo";

export default function Repos() {
	const [allRepos, setAllRepos] = useState<GithubRepos>([]);
	const [sortedRepos, setSortedRepos] = useState<GithubRepos>([]);
	const [filteredRepos, setFilteredRepos] = useState<GithubRepos>([]);

	const [languages, setLanguages] = useState<string[]>([]);
	const [activeLang, setActiveLang] = useState("");

	const { t } = useTranslation();

	const {
		data: repos,
		error: repoError,
		isLoading: isLoadingRepos,
		isError: isRepoError,
	} = useQuery({
		queryKey: ["repos"],
		queryFn: () =>
			axios
				.get("https://api.github.com/users/foxxite/repos")
				.then((res) => githubReposSchema.parse(res.data))
				.catch(() => axios.get("/assets/data/fallback.json").then((res) => githubReposSchema.parse(res.data))),
	});

	const {
		data: otherRepos,
		error: otherRepoError,
		isLoading: isLoadingOtherRepos,
		isError: isOtherRepoError,
	} = useQuery({
		queryKey: ["otherRepos"],
		queryFn: () => axios.get("/assets/data/extra_repos.json").then((res) => githubReposSchema.parse(res.data)),
	});

	useEffect(() => {
		if (repos && otherRepos) {
			setAllRepos([...repos, ...otherRepos]);
		}
	}, [repos, otherRepos]);

	useEffect(() => {
		// Filter the items to not include forked repos, and sort by date
		const filteredItems = allRepos
			.filter((item: GithubRepo) => item.fork === false)
			.sort((a: GithubRepo, b: GithubRepo) => {
				return compareDesc(new Date(a.created_at), new Date(b.created_at));
			});

		setSortedRepos(filteredItems);

		// Get the languages
		const languages = filteredItems.map((item: GithubRepo) => {
			return item.language || "Unknown";
		});

		// Remove duplicates
		const uniqueLanguages = [...new Set(languages)];

		setLanguages(uniqueLanguages);
	}, [allRepos]);

	useEffect(() => {
		// Filter the items to not include forked repos, and sort by date
		const filteredItems = sortedRepos.filter(
			(item: GithubRepo) =>
				item.language === activeLang || activeLang === "" || (item.language == null && activeLang == "Unknown")
		);

		setFilteredRepos(filteredItems);
	}, [sortedRepos, activeLang]);

	return (
		<div id="repos">
			<h2>
				<FontAwesomeIcon icon={faGithub} /> Repositories: {allRepos.length > 0 ? allRepos.length : "Loading..."}
			</h2>

			{isRepoError && (
				<div className={styles["error-message"]}>
					<p>
						A GitHub API error occurred. Please try again later. If this issue persists, please contact me.
					</p>
					<pre>
						{JSON.stringify(
							{
								repoError,
							},
							null,
							2
						)}
					</pre>
				</div>
			)}

			{isOtherRepoError && (
				<div className={styles["error-message"]}>
					<p>
						An error occurred while loading the extra repositories. Please try again later. If this issue
						persists, please contact me.
					</p>
					<pre>
						{JSON.stringify(
							{
								otherRepoError,
							},
							null,
							2
						)}
					</pre>
				</div>
			)}

			{sortedRepos && sortedRepos.length > 0 && (
				<>
					<div className="filter-buttons">
						<button
							key="all"
							className={`${styles["filter-button"]} ${activeLang == "" ? "active" : ""}`}
							onClick={() => setActiveLang("")}>
							{t("All")}
						</button>

						{languages.map((language: string) => {
							return (
								language && (
									<button
										key={language}
										className={`${styles["filter-button"]} ${
											activeLang == language ? "active" : ""
										}`}
										onClick={() => {
											setActiveLang(language);
										}}>
										{language}
									</button>
								)
							);
						})}
					</div>
				</>
			)}

			{filteredRepos && filteredRepos.length > 0 && (
				<div className={styles["repo-container"]}>
					<AnimatePresence>
						{filteredRepos.map(
							(repo: GithubRepo) =>
								// Ignore if the repo is forked
								!repo.fork && (
									<motion.div
										key={repo.id}
										className={styles["repo-item"]}
										initial={{
											scale: 0,
											opacity: 0,
											zIndex: 0,
										}}
										animate={{
											scale: 1,
											opacity: 1,
											zIndex: 1,
										}}
										exit={{
											scale: 0,
											opacity: 0,
											zIndex: 0,
										}}
										transition={{
											ease: "easeInOut",
										}}>
										<Repo repo={repo} />
									</motion.div>
								)
						)}
					</AnimatePresence>
				</div>
			)}

			{(isLoadingRepos || isLoadingOtherRepos) && (
				<>
					<div className="filter-buttons">
						{[...Array(5)].map((_, i) => (
							<div className={`${styles.skeleton} ${styles["filter-button"]}`} key={i}></div>
						))}
					</div>

					<div className={styles["repo-container"]}>
						{[...Array(18)].map((_, i) => (
							<div className={`${styles.skeleton} ${styles["repo-item"]}`} key={i}></div>
						))}
					</div>
				</>
			)}
		</div>
	);
}
