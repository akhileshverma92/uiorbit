import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Star, 
  GitFork, 
  Eye, 
  Calendar, 
  Clock, 
  Globe,
  Code,
  BookOpen,
  AlertCircle,
  GitBranch,
  Lock,
  Share2
} from 'lucide-react';
import libraries from '@/Data/Dataa';


async function getRepoData(repoName) {
  const fullRepoPath = libraries.find(lib => lib.includes(`/${repoName}`));
  
  if (!fullRepoPath) {
    throw new Error('Repository not found');
  }

  const res = await fetch(`https://api.github.com/repos/${fullRepoPath}`, {
    next: { revalidate: 3600 }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch repo data');
  }
  
  return res.json();
}

export default async function RepoInfo({ params }: { params: { repoName: string } }) {
  const repoData = await getRepoData(params.repoName);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header Card */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img 
                  src={repoData.owner.avatar_url} 
                  className="h-12 w-12 rounded-full" 
                  alt={`${repoData.owner.login}'s avatar`} 
                />
                <div>
                  <h1 className="text-3xl font-bold">{repoData.name}</h1>
                  <p className="text-sm text-muted-foreground">
                    maintained by <span className="font-medium">{repoData.owner.login}</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="px-2 py-1">
                  <Globe className="w-4 h-4 mr-1" />
                  {repoData.visibility}
                </Badge>
                <Badge variant="outline" className="px-2 py-1">
                  <Code className="w-4 h-4 mr-1" />
                  {repoData.language}
                </Badge>
                {repoData.license && (
                  <Badge variant="outline" className="px-2 py-1">
                    <Lock className="w-4 h-4 mr-1" />
                    {repoData.license.name}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="space-x-2">
                <Star className="w-4 h-4" />
                <span>Star</span>
                <Separator orientation="vertical" className="h-4 mx-2" />
                <span>{repoData.stargazers_count.toLocaleString()}</span>
              </Button>
              <Button variant="outline" className="space-x-2">
                <GitFork className="w-4 h-4" />
                <span>Fork</span>
                <Separator orientation="vertical" className="h-4 mx-2" />
                <span>{repoData.forks_count.toLocaleString()}</span>
              </Button>
              <Button variant="outline" className="space-x-2">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="space-y-3 ">
        <TabsList className="grid md:w-[40vw] bg-zinc-200 grid-cols-4">
          <TabsTrigger value="overview" className=''>Overview</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="dependencies">Info</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 ">
          <Card className="">
            <CardContent className="pt-6 ">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-lg text-muted-foreground mb-6">{repoData.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <a href={repoData.homepage} className="text-blue-500 hover:underline">
                    {repoData.homepage || 'No homepage provided'}
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-muted-foreground" />
                  <span>{repoData.default_branch} branch</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Repository Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span>Stars</span>
                    </div>
                    <span className="font-mono">{repoData.stargazers_count.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <GitFork className="w-5 h-5 text-blue-500" />
                      <span>Forks</span>
                    </div>
                    <span className="font-mono">{repoData.forks_count.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Eye className="w-5 h-5 text-green-500" />
                      <span>Watchers</span>
                    </div>
                    <span className="font-mono">{repoData.watchers_count.toLocaleString()}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <span>Open Issues</span>
                    </div>
                    <span className="font-mono">{repoData.open_issues_count.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <GitBranch className="w-5 h-5 text-purple-500" />
                      <span>Network</span>
                    </div>
                    <span className="font-mono">{repoData.network_count?.toLocaleString() || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Repository Activity</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <span>Created: {new Date(repoData.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <span>Last updated: {new Date(repoData.updated_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <span>Last pushed: {new Date(repoData.pushed_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dependencies" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Size</span>
                    <span className="font-mono">{(repoData.size / 1024).toFixed(2)} MB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">License</span>
                    <span>{repoData.license?.name || 'Not specified'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Visibility</span>
                    <Badge>{repoData.visibility}</Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Default Branch</span>
                    <span>{repoData.default_branch}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Language</span>
                    <span>{repoData.language}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Topics</span>
                    <div className="flex flex-wrap gap-2">
                      {repoData.topics?.map((topic) => (
                        <Badge key={topic} variant="secondary">{topic}</Badge>
                      )) || 'None'}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      
    </div>
  );
}