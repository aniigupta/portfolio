"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { GitBranch, Star, GitFork } from "lucide-react";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

type GithubUser = {
  avatar_url: string;
  html_url: string;
  login: string;
  name: string | null;
  public_repos: number;
  followers: number;
};

type GithubRepo = {
  id: number;
  html_url: string;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
};

export default function GithubActivityUI({ userData, repos }: { userData: GithubUser; repos: GithubRepo[] }) {
  if (!userData) return null;

  return (
    <section className="tile tile-light">
      <div className="tile-inner">
        <motion.div className="mb-10" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="eyebrow mb-3">Live statistics</span>
          <h2 className="display-lg text-[#1d1d1f]">GitHub activity.</h2>
        </motion.div>

        <motion.div
          className="grid gap-5 md:grid-cols-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={fadeUp} className="surface-card p-8 md:col-span-4">
            <div className="mb-8 flex items-center gap-4">
              <Image
                src={userData.avatar_url}
                alt={`${userData.login} GitHub avatar`}
                width={64}
                height={64}
                className="h-16 w-16 rounded-full"
              />
              <div>
                <h3 className="tagline text-[#1d1d1f]">{userData.name || userData.login}</h3>
                <a href={userData.html_url} target="_blank" rel="noreferrer" className="text-link caption">
                  @{userData.login}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[11px] bg-[#f5f5f7] p-4 text-center">
                <span className="display-md block text-[#1d1d1f]">{userData.public_repos}</span>
                <span className="caption text-[#7a7a7a]">Repositories</span>
              </div>
              <div className="rounded-[11px] bg-[#f5f5f7] p-4 text-center">
                <span className="display-md block text-[#1d1d1f]">{userData.followers}</span>
                <span className="caption text-[#7a7a7a]">Followers</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="md:col-span-8">
            <h3 className="caption-strong mb-4 text-[#1d1d1f]">Recently updated</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              {repos.map((repo) => (
                <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="surface-card block p-5">
                  <div className="mb-3 flex items-start justify-between">
                    <h4 className="caption-strong truncate pr-4 text-[#1d1d1f]">{repo.name}</h4>
                    <GitFork className="h-4 w-4 shrink-0 text-[#7a7a7a]" />
                  </div>
                  <p className="caption mb-4 line-clamp-2 min-h-[40px] text-[#333333]">
                    {repo.description || "No description provided."}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="fine-print text-[#0066cc]">{repo.language || "Markdown"}</span>
                    <div className="flex items-center gap-3 text-[#7a7a7a]">
                      <span className="fine-print flex items-center gap-1">
                        <Star className="h-3 w-3" /> {repo.stargazers_count}
                      </span>
                      <span className="fine-print flex items-center gap-1">
                        <GitBranch className="h-3 w-3" /> {repo.forks_count}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
