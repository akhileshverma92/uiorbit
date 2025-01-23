"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Star, Download, Globe, CheckCircle2, XCircle } from 'lucide-react';

const allLibraries = [
  {
    name: "Material UI",
    stars: "85.2k",
    downloads: "2.5M",
    version: "5.14.0",
    features: {
      typescript: true,
      customization: true,
      ssr: true,
      rtl: true,
      darkMode: true,
      a11y: true,
    },
    bundleSize: "128kb",
    license: "MIT",
    score: 92
  },
  {
    name: "Chakra UI",
    stars: "32.4k",
    downloads: "1.2M",
    version: "2.8.0",
    features: {
      typescript: true,
      customization: true,
      ssr: true,
      rtl: true,
      darkMode: true,
      a11y: true,
    },
    bundleSize: "89kb",
    license: "MIT",
    score: 94
  },
  {
    name: "Tailwind UI",
    stars: "71.3k",
    downloads: "3.1M",
    version: "3.3.0",
    features: {
      typescript: true,
      customization: true,
      ssr: true,
      rtl: false,
      darkMode: true,
      a11y: true,
    },
    bundleSize: "45kb",
    license: "MIT",
    score: 96
  },
  {
    name: "Ant Design",
    stars: "86.4k",
    downloads: "2.8M",
    version: "5.8.0",
    features: {
      typescript: true,
      customization: true,
      ssr: true,
      rtl: true,
      darkMode: true,
      a11y: true,
    },
    bundleSize: "156kb",
    license: "MIT",
    score: 90
  }
];


export default function ComparisonPage() {
  const [selectedLibraries, setSelectedLibraries] = useState([]);

  const handleLibrarySelect = (libraryName) => {
    if (selectedLibraries.includes(libraryName)) {
      setSelectedLibraries(selectedLibraries.filter(name => name !== libraryName));
    } else if (selectedLibraries.length < 2) {
      setSelectedLibraries([...selectedLibraries, libraryName]);
    }
  };

  const libraryData = selectedLibraries.map(name => 
    allLibraries.find(lib => lib.name === name)
  );

  const showComparison = selectedLibraries.length === 2;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        {/* Library Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Select Two Libraries to Compare</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {allLibraries.map((lib) => (
              <Button
                key={lib.name}
                variant={selectedLibraries.includes(lib.name) ? "default" : "outline"}
                onClick={() => handleLibrarySelect(lib.name)}
                className="w-full"
              >
                {lib.name}
              </Button>
            ))}
          </div>
        </div>

        {!showComparison ? (
          <Card className="text-center p-6">
            <CardContent>
              <p className="text-muted-foreground">
                Please select two libraries to compare
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Rest of the comparison UI */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="outline" className="mb-4">
                Comparing Libraries
              </Badge>
              <h1 className="text-4xl font-bold mb-6">
                {selectedLibraries[0]} vs {selectedLibraries[1]}
              </h1>
            </div>

            <Tabs defaultValue="features" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
                <TabsTrigger value="stats">Stats</TabsTrigger>
              </TabsList>

              <TabsContent value="features">
                <Card>
                  <CardHeader>
                    <CardTitle>Feature Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Feature</TableHead>
                          {libraryData.map(lib => (
                            <TableHead key={lib.name}>{lib.name}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {['typescript', 'customization', 'ssr', 'rtl', 'darkMode', 'a11y'].map(feature => (
                          <TableRow key={feature}>
                            <TableCell className="font-medium capitalize">
                              {feature.replace(/([A-Z])/g, ' $1').trim()}
                            </TableCell>
                            {libraryData.map(lib => (
                              <TableCell key={`${lib.name}-${feature}`}>
                                {lib.features[feature] ? (
                                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                                ) : (
                                  <XCircle className="w-5 h-5 text-red-500" />
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance">
                <div className="grid md:grid-cols-2 gap-6">
                  {libraryData.map(lib => (
                    <Card key={lib.name}>
                      <CardHeader>
                        <CardTitle>{lib.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Bundle Size</span>
                            <Badge variant="secondary">{lib.bundleSize}</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Latest Version</span>
                            <Badge variant="outline">{lib.version}</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Performance Score</span>
                            <Badge variant={lib.score >= 90 ? "default" : "secondary"}>
                              {lib.score}/100
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="community">
                <div className="grid md:grid-cols-2 gap-6">
                  {libraryData.map(lib => (
                    <Card key={lib.name} className="relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-muted" />
                      <CardHeader className="relative">
                        <CardTitle>{lib.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="relative">
                        <div className="space-y-6">
                          <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-500" />
                            <span className="font-semibold">{lib.stars} Stars</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Download className="w-5 h-5 text-blue-500" />
                            <span className="font-semibold">{lib.downloads} Monthly Downloads</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className="w-5 h-5 text-green-500" />
                            <span className="font-semibold">{lib.license} License</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="stats">
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Library</TableHead>
                          <TableHead>Stars</TableHead>
                          <TableHead>Downloads</TableHead>
                          <TableHead>Bundle Size</TableHead>
                          <TableHead>Score</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {libraryData.map(lib => (
                          <TableRow key={lib.name}>
                            <TableCell className="font-medium">{lib.name}</TableCell>
                            <TableCell>{lib.stars}</TableCell>
                            <TableCell>{lib.downloads}</TableCell>
                            <TableCell>{lib.bundleSize}</TableCell>
                            <TableCell>{lib.score}/100</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
}