import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Star, GitFork, Eye,
  ChevronRight, HelpCircle, Sparkles, Github, GithubIcon, Boxes, Code2, ArrowRight, SmileIcon, BookLock
} from 'lucide-react';
import libraries from '@/Data/Dataa';
import DotPattern from '@/components/ui/dot-pattern';
import { Button } from '@/components/ui/button';
import AnimatedGradientText from '@/components/ui/animated-gradient-text';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { OrbitingCircles } from '@/components/ui/orbiting-circles';
import SparklesText from '@/components/ui/sparkles-text';
import BoxReveal from '@/components/ui/box-reveal';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

// const libraries = [
//   "mui/material-ui",
//   "tailwindlabs/tailwindcss",
//   "chakra-ui/chakra-ui",
//   "storybookjs/storybook",
//   "ant-design/ant-design",
//   "shadcn-ui/ui",
//   "magicuidesign/magicui",
// ];

async function getReposData() {
  const promises = libraries.map(async (repo) => {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) throw new Error(`Failed to fetch ${repo}`);
    return res.json();
  });

  return Promise.all(promises);
}

export default async function LibraryCards() {
  const repos = await getReposData();
  console.log(repos);

  return (
    <div className="main flex flex-col items-center">
      <AnimatedGradientText className='z-50 mt-10'>
        🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
        <span
          className="
            inline font-semibold animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent"
        >
          Introducing
        </span>
        <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </AnimatedGradientText>
      <DotPattern >
      </DotPattern>

      <div className="hero flex items-center  justify-between gap-2 flex-col-reverse md:flex-row py-14">

        <div className="txt flex flex-col-reverse items-start justify-center  z-50">

          <div className="size-full max-w-lg items-center justify-center overflow-hidden pt-2">
            <BoxReveal boxColor={"#5046e6"} duration={0.5}>
              <p className="text-[5rem] flex text-start font-semibold animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text ">
                <SparklesText text={"UiORBIT"} className='md:pl-0 pl-[64px]  ' />
                <Badge  className="ml-2 z-50 mt-[10px] h-5">v0.1</Badge>
              </p>
            </BoxReveal>

            <BoxReveal boxColor={"#5046e6"} duration={0.5}>
              <h2 className="mt-[.5rem] text-[1.7rem] md:text-[2rem]">
                Explore, Compare and Orbit Around  <span className="text-[#5046e6] protest-guerrilla-regular ">the Best UI Libraries </span>in One Place

              </h2>
            </BoxReveal>
            <BoxReveal >
              <div className="btns flex ml-12 md:ml-0 items-center justify-center gap-3">
                <Link href="#explore"> <RainbowButton>Explore</RainbowButton></Link>
                <Link href="/compare"> <RainbowButton>Compare</RainbowButton></Link>
              </div>
            </BoxReveal>



          </div>
        </div>
        <div className="logo">

          <div className="relative py-5 flex z-50  h-[350px] w-[350px] flex-col items-center justify-center overflow-hidden bg-white rounded-[50%] border border-gray-200 shadow-lg  ">
            <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-5xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
              UiOrbit
            </span>
            <OrbitingCircles iconSize={100} radius={140}  >
            <Image src='/sementic.png'width={30} height={30} className='rounded-[50%]' />
            <Image src='/rb.png'width={30} height={30} className='rounded-[50%]'/>
              <Image src='/one.png'width={30} height={30} className='rounded-[50%]'/>
              <Image src='/nextui.png'width={30} height={30} className='rounded-[50%]'/>

            </OrbitingCircles>
            <OrbitingCircles iconSize={140} radius={80}className='rounded-[50%]' >
            <Image src='/ant.png'width={30} height={30}className='rounded-[50%]' />
            <Image src='/mui.png'width={30} height={30}className='rounded-[50%]' />

            </OrbitingCircles>
            <OrbitingCircles iconSize={100} radius={30}  >
            <Image src='/magic.png'width={30} height={30} className='rounded-[50%]'/>

            </OrbitingCircles>


          </div>
        </div>
      </div>
      <Button className='w-44 text-xl md:mt-10 font-mono font-semibold'>Explore The UIs</Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4" id='explore'>

        {repos.map((repo) => (
          <Link
            key={repo.id}
            href={`/info/${repo.name}`}
            className="block"
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="mainhead flex items-center space-x-2">
                  <h3 className="text-lg font-bold">{repo.name}</h3>
                  <img src={repo.owner.avatar_url} className="h-6 w-6 rounded-full" alt="" />
                </div>
                <div className="flex items-center space-x-2">                   <Star className="w-4 h-4" />
                  <span>{repo.stargazers_count.toLocaleString()}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{repo.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <GitFork className="w-4 h-4" />
                    <span>{repo.forks_count.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>{repo.watchers_count.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div className="footer w-ull text-xl">

        <Card className="w-[100vw] max-w-4xl mx-auto bg-gradient-to-br from-background to-muted/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem
                value="item-1"
                className="border-b border-muted-foreground/20"
              >
                <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                  What is UIOrbit?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  UIOrbit is a platform that showcases different React and Next.js UI libraries,
                  allowing developers to compare, explore, and choose the right tools for their projects.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="border-b border-muted-foreground/20"
              >
                <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                  How do I get started?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  Simply visit UIOrbit, browse through the available UI libraries,
                  and follow the installation guides provided for each library.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                  Is UIOrbit free to use?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  Yes, UIOrbit is completely free to use. We aim to make UI development
                  simpler and more accessible for everyone.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
        <div className="flex items-center justify-center gap-4 mt-8">
          <p className="text-gray-500">An <span className='font-bold protest-guerrilla-regular'>Open-Source</span> project Made with💕by the <span className='font-semibold'>UIOrbit Team</span></p>
        </div>  
      </div>


    </div >
  );
}