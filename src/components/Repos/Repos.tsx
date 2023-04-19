/**
 * /*
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import styles from "./Repos.module.scss";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import LangIcon from "../LangIcon/LangIcon";

import { useTranslation } from "react-i18next";
import "../../i18n/config";
import { AnimatePresence, motion } from "framer-motion";

import { compareDesc, format, formatDistanceToNowStrict } from "date-fns";
import { enGB, nl } from "date-fns/locale";
import { IGithubRepo } from "../../types/types";

export default function Repos() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);

	const [items, setItems] = useState([]);
	const [repos, setRepos] = useState([]);

	const [languages, setLanguages] = useState<string[]>([]);
	const [activeLang, setActiveLang] = useState("");

	const [fromFallback, setFromFallback] = useState(false);

	const { t } = useTranslation();

	const capitalize = (s: string) => {
		if (typeof s !== "string") return "";
		return s.charAt(0).toUpperCase() + s.slice(1);
	};

	useEffect(() => {
		axios
			.get("https://api.github.com/users/foxxite/repos")
			.then(function (response) {
				getOtherRepos(response.data);
			})
			.catch(function (error) {
				setError(error);

				// Load the fallback.json
				axios
					.get("/assets/data/fallback.json")
					.then(function (response) {
						setFromFallback(true);
						console.log("Fallback loaded");
						getOtherRepos(response.data);
					})
					.catch(console.error);
			});
	}, []);

	function getOtherRepos(fromGithub: []) {
		// Fetch other repos that I've worked on
		axios
			.get("/assets/data/extra_repos.json")
			.then(function (response) {
				setTimeout(() => {
					const newItems = fromGithub.concat(response.data);
					setItems(newItems);
					setIsLoaded(true);
				}, 1000);
			})
			.catch(console.error);
	}

	useEffect(() => {
		// Filter the items to not include forked repos, and sort by date
		const filteredItems = items
			.filter((item: IGithubRepo) => item.fork === false)
			.sort((a: IGithubRepo, b: IGithubRepo) => {
				return compareDesc(new Date(a.created_at), new Date(b.created_at));
			});

		setRepos(filteredItems);

		// Get the languages
		const languages = filteredItems.map((item: IGithubRepo) => {
			return item.language;
		});

		// Remove duplicates
		const uniqueLanguages = [...new Set(languages)];

		setLanguages(uniqueLanguages);
	}, [items]);

	return (
		<div id="repos">
			<h2>
				<FontAwesomeIcon icon={faGithub} /> Repositories: {isLoaded ? repos.length : "Loading..."}
			</h2>

			{isLoaded && repos.length > 0 && (
				<React.Fragment>
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

					<div className={styles["repo-container"]}>
						<AnimatePresence>
							{repos.map(
								(repo: IGithubRepo) =>
									// Ignore if the repo is forked or if the language filter doesn't match
									!repo.fork &&
									(repo.language === activeLang || activeLang === "") && (
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
											<div className={styles["repo-item-info"]}>
												{/* file deepcode ignore DOMXSS: Data source is trusted */}
												<a
													target="_blank"
													href={repo.html_url}
													className={styles["repo-item-title"]}>
													{capitalize(repo.name)}
												</a>
												<div className={styles["repo-item-language"]}>
													<LangIcon lang={repo.language} />
												</div>
											</div>

											<div className={styles["repo-item-description"]}>
												{capitalize(repo.description)}
											</div>

											<div className={styles["repo-item-stats"]}>
												<div className={styles["repo-item-stats-item"]}>
													<span className={styles["repo-item-stats-item-label"]}>
														{t("Created")}
													</span>
													<span className={styles["repo-item-stats-item-value"]}>
														{format(new Date(repo.created_at), "d LLLL yyyy", {
															locale: t("locale") == "en" ? enGB : nl,
														})}
														{", "}
														{formatDistanceToNowStrict(new Date(repo.created_at), {
															addSuffix: true,
															locale: t("locale") == "en" ? enGB : nl,
														})}
													</span>
												</div>

												<div className={styles["repo-item-stats-item"]}>
													<span className={styles["repo-item-stats-item-label"]}>
														{t("Stars")}
													</span>
													<span className={styles["repo-item-stats-item-value"]}>
														{repo.stargazers_count}
													</span>
												</div>

												<div className={styles["repo-item-stats-item"]}>
													<span className={styles["repo-item-stats-item-label"]}>
														{t("Forks")}
													</span>
													<span className={styles["repo-item-stats-item-value"]}>
														{repo.forks_count}
													</span>
												</div>

												<div className={styles["repo-item-stats-item"]}>
													<span className={styles["repo-item-stats-item-label"]}>
														{t("Watchers")}
													</span>
													<span className={styles["repo-item-stats-item-value"]}>
														{repo.watchers_count}
													</span>
												</div>
											</div>
										</motion.div>
									)
							)}
						</AnimatePresence>
					</div>
				</React.Fragment>
			)}

			{!isLoaded && (
				<React.Fragment>
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
				</React.Fragment>
			)}
		</div>
	);
}
