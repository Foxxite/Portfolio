/**
 * Copyright (c) 2025 Foxxite | Articca
 *   All rights reserved.
 *
 * @format
 */

import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ExternalLink, EyeIcon, GitForkIcon, PencilIcon, PlusIcon, StarIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { Badge } from "./ui/badge";
import GradientText from "./ui/gradient-text";
import LanguageWithIcon from "./ui/language-with-icon";
import { format } from "date-fns";
import { useEffect } from "react";
import useGithubStore from "@/stores/githubStore";

function Repos() {
	const githubData = useGithubStore();
	const repoLanguages = Array.from(githubData.languages).sort();

	const languages = ["All", ...repoLanguages];

	useEffect(() => {
		if (!githubData.fetched) githubData.fetch();
	}, [githubData]);

	return (
		<div className="w-full bg-muted/30">
			<section className="container mx-auto px-4 py-8">
				<div className="text-center text-balance">
					<h2 className="text-4xl font-bold mb-4">
						My <GradientText>GitHub</GradientText> Repositories
					</h2>
					<p>I'm a big fan of the open source community and I'm always coding something new.</p>
					<p>Check out some of my public repositories.</p>
				</div>

				<Tabs defaultValue="All" className="w-full">
					<div className="flex justify-center mt-8 mb-4 overflow-x-auto pb-2">
						<TabsList>
							{languages.map((lang) => (
								<TabsTrigger key={lang} value={lang}>
									<LanguageWithIcon language={lang} /> (
									{githubData.languagesCount.get(lang) || (lang == "All" ? githubData.repoCount : 0)})
								</TabsTrigger>
							))}
						</TabsList>
					</div>

					{languages.map((lang) => (
						<TabsContent key={lang} value={lang}>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								<AnimatePresence>
									{githubData.repos
										.filter((repo) => lang == "All" || repo.language == lang)
										.map((repo) => (
											<motion.div
												key={repo.name}
												initial={{ opacity: 0, y: 20 }}
												whileInView={{ opacity: 1, y: 0 }}
												viewport={{ once: true }}
												transition={{ duration: 0.5 }}
												exit={{ opacity: 0, y: 20 }}
												className="w-full h-full flex-1">
												<Card
													key={repo.id}
													className="w-full h-full hover:border-primary transition-colors duration-300 ease-in-out">
													<CardHeader>
														<CardTitle className="flex flex-row items-center justify-between">
															<a
																href={repo.html_url}
																target="_blank"
																rel="noreferrer"
																className="text-xl font-bold">
																{repo.name}
															</a>
															<Badge variant="secondary">
																<LanguageWithIcon language={repo.language} />
															</Badge>
														</CardTitle>
														<CardDescription>
															<p>
																{repo.updated_at && (
																	<TooltipProvider>
																		<Tooltip>
																			<TooltipTrigger>
																				<PencilIcon className="w-4 h-4 inline-block mr-1" />
																				{format(repo.updated_at, "d LLLL yyyy")}
																			</TooltipTrigger>
																			<TooltipContent>
																				<p>
																					Updated at:{" "}
																					{format(
																						repo.updated_at,
																						"d LLLL yyyy"
																					)}
																				</p>
																			</TooltipContent>
																		</Tooltip>
																	</TooltipProvider>
																)}
																&nbsp;&bull;&nbsp;
																{repo.created_at && (
																	<TooltipProvider>
																		<Tooltip>
																			<TooltipTrigger>
																				<PlusIcon className="w-4 h-4 inline-block mr-1" />
																				{format(repo.created_at, "d LLLL yyyy")}
																			</TooltipTrigger>
																			<TooltipContent>
																				<p>
																					Created at:{" "}
																					{format(
																						repo.created_at,
																						"d LLLL yyyy"
																					)}
																				</p>
																			</TooltipContent>
																		</Tooltip>
																	</TooltipProvider>
																)}
															</p>
														</CardDescription>
													</CardHeader>
													<CardContent>
														{repo.topics?.map((topic) => (
															<Badge key={topic} variant="default">
																{topic}
															</Badge>
														))}

														<p>{repo.description}</p>
													</CardContent>
													<CardFooter className="flex flex-row items-center justify-between">
														<p className="text-sm">
															<StarIcon className="w-4 h-4 inline-block mr-1" />
															{repo.stargazers_count}

															<GitForkIcon className="w-4 h-4 inline-block ml-4 mr-1" />
															{repo.forks_count}

															<EyeIcon className="w-4 h-4 inline-block ml-4 mr-1" />
															{repo.watchers_count}
														</p>

														<a
															href={repo.html_url}
															target="_blank"
															rel="noreferrer"
															className="text-sm font-bold">
															<img
																src="/icons/github.svg"
																alt="Github"
																className="w-4 h-4 inline-block mr-1"
															/>
															View on Github
														</a>
													</CardFooter>
												</Card>
											</motion.div>
										))}
								</AnimatePresence>
							</div>
						</TabsContent>
					))}
				</Tabs>

				<div className="text-center mt-8">
					<a href="https://github.com/Foxxite/" target="_blank" rel="noreferrer">
						<img src="/icons/github.svg" alt="Github" className="w-4 h-4 inline-block mr-1" />
						View All Repositories
						<ExternalLink className="w-4 h-4 inline-block ml-1" />
					</a>
				</div>
			</section>
		</div>
	);
}

export default Repos;
