import { FloatingHeader } from "@/components/navigation/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { USER } from "@/config/user";
import { Connect } from "@/features/home/components/connect";
import { Education } from "@/features/home/components/education";
import { GitHubContribution } from "@/features/home/components/github-contribution";
import Info from "@/features/home/components/info";
import { Projects } from "@/features/home/components/projects";
import { WorkEx } from "@/features/home/components/workex";
import { Profile } from "@/features/home/components/profile";
import { createOgImage } from "@/lib/createOgImage";
import { JsonLd, Organization, WithContext } from "@/lib/seo/json-ld";
import { createMetadata } from "@/lib/seo/metadata";
import { TechText } from "@/components/tech-text";
import type { Metadata } from "next/types";
import Skills from "@/features/home/components/skills";
import { AsciiLayout } from "@/components/ascii-layout";
import { BorderGlow } from "@repo/design-system/components/ui/border-glow";

// Force static generation at build time
export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const title = USER.tagline;
  const description = USER.description;
  const image = createOgImage({
    title: title,
    meta: description,
  });
  return createMetadata({
    title: title,
    description: description,
    image: image,
  });
}

export default async function Page() {
  const jsonLd: WithContext<Organization> = {
    "@type": "Organization",
    "@context": "https://schema.org",
  };

  return (
    <>
      <JsonLd code={jsonLd} />
      <Info show={["time", "screen"]} />
      <ScrollArea useScrollAreaId className="">
        <FloatingHeader scrollTitle="Pratyay Pratim Borah" />
        <AsciiLayout>
          <div className="layout relative z-10 content-wrapper mb-10 pt-4">
            <header className="relative w-full mb-8">
              <TechText
                text="FULL  STACK  ENGINEER"
                fontWeight={600}
                fontSize={200}
                reveal="letter"
                dashLength={10}
                dashGap={2}
                specks={15}
              />
            </header>

            <div className="border-2 rounded-sm border-[#303030] dark:border-[#e8e8e8] hover:border-black  dark:hover:border-[#ffffff] transition-all duration-300 ">
              <Profile />
              <hr className="mb-8 border-1 border-black dark:border-white px-0 mx-0" />
              <section className="my-12 px-8 ">
                <h2 className="mb-3 font-medium text-lg">About</h2>
                <div className="space-y-4 text-neutral-800 dark:text-neutral-300/80">
                  <p>
                    I'm a Full Stack Engineer based in India. I'm passionate
                    about building scalable, accessible and user-focused web
                    applications that solve real-world problems through clean,
                    maintainable, and efficient code.
                  </p>
                  <p>
                    Over the course of my learning journey, I've developed
                    multiple full-stack projects while gaining practical
                    experience at multiple organizations, where I contributed to
                    modern web interfaces and production-ready features.
                  </p>

                  <p>
                    I leverage Agentic AI to accelerate my development workflow.
                    By integrating AI-driven tools and custom agents into my
                    daily routine, I streamline repetitive tasks, rapidly
                    prototype new features, and maintain a sharp focus on
                    writing high-performance, production-ready code.
                  </p>
                  <p>
                    Beyond coding, I enjoy traveling and photography, which
                    inspire creativity and sharpen my attention to detail.
                  </p>
                </div>
              </section>
            </div>

            <section id="projects" className="mt-12 scroll-mt-16">
              <Projects />
            </section>

            <section className="mt-12">
              <GitHubContribution />
            </section>

            <section id="skills" className="mt-12 scroll-mt-16">
              <Skills />
            </section>

            <section id="work-experience" className="mt-12 scroll-mt-16">
              <WorkEx />
            </section>

            <section id="education" className="mt-12 scroll-mt-16">
              <Education />
            </section>

            {/* <section className="mt-12">
              <h2 className="mb-3 text-lg font-medium">Where</h2>
              <ViewMagnifier>
                <MapLocation />
              </ViewMagnifier>
            </section> */}
          </div>
        </AsciiLayout>
      </ScrollArea>
    </>
  );
}
