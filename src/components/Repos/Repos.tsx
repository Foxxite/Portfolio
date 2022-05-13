/**
 * /*
 *   Copyright (c) 2022 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import "./Repos.scss";

import { GithubRepo } from "../../github";
import axios from "axios";
import moment from "moment";
import LangIcon from "../LangIcon/LangIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import { useTranslation } from "react-i18next";

import "../../i18n/config";

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

	// Note: the empty deps array [] means
	// this useEffect will run once
	// similar to componentDidMount()
	useEffect(() => {
		// replace the fetch with axios
		axios
			.get("https://api.github.com/users/foxxite/repos")
			.then(function (response) {
				setIsLoaded(true);
				setItems(response.data);
			})
			.catch(function (error) {
				setIsLoaded(true);
				setError(error);

				// Load the fallback.json
				axios.get("/fallback.json").then(function (response) {
					setIsLoaded(true);
					setFromFallback(true);
					setItems(response.data);
				});
			});
	}, []);

	useEffect(() => {
		// Filter the items to not include forked repos, and sort by date
		const filteredItems = items
			.filter((item: GithubRepo) => item.fork === false)
			.sort((a: GithubRepo, b: GithubRepo) => {
				return moment(b.created_at).diff(moment(a.created_at));
			});

		setRepos(filteredItems);

		// Get the languages
		const languages = filteredItems.map((item: GithubRepo) => {
			return item.language;
		});

		// Remove duplicates
		const uniqueLanguages = [...new Set(languages)];

		setLanguages(uniqueLanguages);
	}, [items]);

	return (
		<React.Fragment>
			<h1>
				<FontAwesomeIcon icon={faGithub} /> Repositories: {isLoaded ? repos.length : "Loading..."}
			</h1>

			{error && <div>Error: {(error as any).message}</div>}

			{!isLoaded && <div>{t("loading")}</div>}

			{fromFallback && <div>{t("loaded_fallback")}</div>}

			{isLoaded && repos.length > 0 && (
				<React.Fragment>
					<div className="filter-buttons">
						<button
							key="all"
							className={`filter-button ${activeLang == "" ? "active" : ""}`}
							onClick={() => setActiveLang("")}>
							{t("All")}
						</button>

						{languages.map((language: string) => {
							return (
								language && (
									<button
										key={language}
										className={`filter-button ${activeLang == language ? "active" : ""}`}
										onClick={() => {
											setActiveLang(language);
										}}>
										{language}
									</button>
								)
							);
						})}
					</div>

					<div className="repo-container">
						{repos.map(
							(repo: GithubRepo) =>
								// Ignore if the repo is forked or if the language filter doesn't match
								!repo.fork &&
								(repo.language === activeLang || activeLang === "") && (
									<div key={repo.id} className="repo-item">
										<div className="repo-item-info">
											<a target="_blank" href={repo.html_url} className="repo-item-title">
												{capitalize(repo.name)}
											</a>
											<div className="repo-item-language">
												<LangIcon lang={repo.language} />
											</div>
										</div>

										<div className="repo-item-description">{capitalize(repo.description)}</div>

										<div className="repo-item-stats">
											<div className="repo-item-stats-item">
												<span className="repo-item-stats-item-label">{t("Created")}</span>
												<span className="repo-item-stats-item-value">
													{
														// Use moment to format the date to local time notation
														moment(repo.created_at).format("LLL")
													}
												</span>
											</div>

											<div className="repo-item-stats-item">
												<span className="repo-item-stats-item-label">{t("Stars")}</span>
												<span className="repo-item-stats-item-value">
													{repo.stargazers_count}
												</span>
											</div>

											<div className="repo-item-stats-item">
												<span className="repo-item-stats-item-label">{t("Forks")}</span>
												<span className="repo-item-stats-item-value">{repo.forks_count}</span>
											</div>

											<div className="repo-item-stats-item">
												<span className="repo-item-stats-item-label">{t("Watchers")}</span>
												<span className="repo-item-stats-item-value">
													{repo.watchers_count}
												</span>
											</div>
										</div>
									</div>
								)
						)}
					</div>
				</React.Fragment>
			)}
		</React.Fragment>
	);
}
