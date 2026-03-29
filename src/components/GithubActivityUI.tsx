"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { GitBranch, GitCommit, Github, Star, GitFork } from "lucide-react";

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
    <section className="mb-40 pt-10">
      <motion.div className="mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <span className="text-primary font-bold tracking-widest text-[10px] uppercase block mb-3 flex items-center gap-2">
          <Github className="w-3 h-3" /> Live Statistics
        </span>
        <h2 className="text-4xl md:text-5xl font-black mb-6">GitHub Activity</h2>
      </motion.div>

      <div className="grid md:grid-cols-12 gap-8">
        <motion.div 
          className="md:col-span-4 glass-card p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-primary/20 transition-all"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -z-10 group-hover:bg-primary/20 transition-colors"></div>
          <div className="flex items-center gap-4 mb-8">
            <Image src={userData.avatar_url} alt={`${userData.login} GitHub avatar`} width={64} height={64} unoptimized className="w-16 h-16 rounded-full border border-white/10" />
            <div>
              <h3 className="font-bold text-xl">{userData.name || userData.login}</h3>
              <a href={userData.html_url} target="_blank" rel="noreferrer" className="text-muted-foreground text-sm hover:text-primary transition-colors">@{userData.login}</a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
              <span className="block text-2xl font-black text-white mb-1">{userData.public_repos}</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Repositories</span>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
              <span className="block text-2xl font-black text-white mb-1">{userData.followers}</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Followers</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="md:col-span-8 space-y-4"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <GitCommit className="w-5 h-5 text-primary" /> Recently Updated
          </h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {repos.map((repo) => (
              <a 
                key={repo.id} 
                href={repo.html_url} 
                target="_blank" 
                rel="noreferrer"
                className="glass-card p-5 rounded-2xl border border-white/5 hover:border-primary/40 hover:-translate-y-1 transition-all group relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-white group-hover:text-primary transition-colors truncate pr-4">{repo.name}</h4>
                  <GitFork className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-4 min-h-[32px]">{repo.description || "No description provided."}</p>
                <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest">
                  <span className="text-primary">{repo.language || "Markdown"}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-muted-foreground"><Star className="w-3 h-3" /> {repo.stargazers_count}</span>
                    <span className="flex items-center gap-1 text-muted-foreground"><GitBranch className="w-3 h-3" /> {repo.forks_count}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
