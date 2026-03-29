import GithubActivityUI from "./GithubActivityUI";

export default async function GithubActivity() {
  let userData = null;
  let repos = [];

  try {
    // SSR Fetching drastically improves Largest Contentful Paint (LCP) and CLS
    // 3600 revalidate bypasses strict API rate limits while maintaining freshness.
    const userRes = await fetch("https://api.github.com/users/aniigupta", {
      next: { revalidate: 3600 }
    });
    
    if (userRes.ok) {
      userData = await userRes.json();
    }

    const reposRes = await fetch("https://api.github.com/users/aniigupta/repos?sort=updated&per_page=3", {
      next: { revalidate: 3600 }
    });
    
    if (reposRes.ok) {
      repos = await reposRes.json();
    }
  } catch (error) {
    console.error("Failed to fetch Github Data:", error);
  }

  // Prevent breaking layout if GitHub API is down completely
  if (!userData) return null;

  return <GithubActivityUI userData={userData} repos={repos} />;
}
