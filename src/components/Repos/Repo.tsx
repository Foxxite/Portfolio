/**
 * Copyright (c) 2024 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import React from "react";
import styles from "./Repos.module.scss";
import { capitalize } from "../../utils";
import LangIcon from "../LangIcon/LangIcon";
import { GithubRepo } from "../../schemas/githubRepoSchema";

import { useTranslation } from "react-i18next";

import { compareDesc, format, formatDistanceToNowStrict } from "date-fns";
import { enGB, nl } from "date-fns/locale";

function Repo(props: { repo: GithubRepo }) {
	const { repo } = props;

	const { t } = useTranslation();

	return (
		<>
			<div className={styles["repo-item-info"]}>
				<a target="_blank" href={repo.html_url} className={styles["repo-item-title"]}>
					{capitalize(repo.name)}
				</a>
				<div className={styles["repo-item-language"]}>
					<LangIcon lang={repo.language || "Unknown"} />
				</div>
			</div>

			<div className={styles["repo-item-description"]}>{capitalize(repo.description || "")}</div>

			<div className={styles["repo-item-stats"]}>
				<div className={styles["repo-item-stats-item"]}>
					<span className={styles["repo-item-stats-item-label"]}>{t("Created")}</span>
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
					<span className={styles["repo-item-stats-item-label"]}>{t("Stars")}</span>
					<span className={styles["repo-item-stats-item-value"]}>{repo.stargazers_count}</span>
				</div>

				<div className={styles["repo-item-stats-item"]}>
					<span className={styles["repo-item-stats-item-label"]}>{t("Forks")}</span>
					<span className={styles["repo-item-stats-item-value"]}>{repo.forks_count}</span>
				</div>

				<div className={styles["repo-item-stats-item"]}>
					<span className={styles["repo-item-stats-item-label"]}>{t("Watchers")}</span>
					<span className={styles["repo-item-stats-item-value"]}>{repo.watchers_count}</span>
				</div>
			</div>
		</>
	);
}

export default Repo;
