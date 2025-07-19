"use client"

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Palette, Sparkles, Award, Heart, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    story: false,
    journey: false,
    social: false,
  });

  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const journeyRef = useRef(null);
  const socialRef = useRef(null);
  const [splashes, setSplashes] = useState<any[]>([]);

  useEffect(() => {
    const backgrounds = [
      "rgba(255, 20, 147, 0.4)",
      "rgba(255, 140, 0, 0.4)",
      "rgba(255, 255, 0, 0.4)",
      "rgba(0, 255, 127, 0.4)",
      "rgba(0, 191, 255, 0.4)",
    ];
    setSplashes(
      Array.from({ length: 10 }).map(() => ({
        width: Math.random() * 60 + 20,
        height: Math.random() * 60 + 20,
        background: backgrounds[Math.floor(Math.random() * backgrounds.length)],
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDelay: Math.random() * 5,
      }))
    );
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.target === heroRef.current && entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, hero: true }));
        } else if (entry.target === storyRef.current && entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, story: true }));
        } else if (entry.target === journeyRef.current && entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, journey: true }));
        } else if (entry.target === socialRef.current && entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, social: true }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (heroRef.current) observer.observe(heroRef.current);
    if (storyRef.current) observer.observe(storyRef.current);
    if (journeyRef.current) observer.observe(journeyRef.current);
    if (socialRef.current) observer.observe(socialRef.current);

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
      if (storyRef.current) observer.unobserve(storyRef.current);
      if (journeyRef.current) observer.unobserve(journeyRef.current);
      if (socialRef.current) observer.unobserve(socialRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen cursor-paint-brush">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="overflow-hidden relative py-8 w-full sm:py-12 md:py-16 lg:py-24 xl:py-32 animated-bg paint-splatter"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 opacity-70 animate-color-mix" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] mix-blend-overlay opacity-10" />

        {/* Paint splashes */}
        <div className="overflow-hidden absolute inset-0">
          {splashes.map((splash, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-paint-splash"
              style={{
                width: `${splash.width}px`,
                height: `${splash.height}px`,
                background: splash.background,
                left: `${splash.left}%`,
                top: `${splash.top}%`,
                animationDelay: `${splash.animationDelay}s`,
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 px-4 sm:px-6 md:px-8">
          <div className={`text-center ${isVisible.hero ? "animate-fade-in-up" : "opacity-0"}`}>
            <Badge className="mb-4 bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 animate-pulse-slow">
              <Sparkles className="mr-2 w-4 h-4" />
              Meet the Artist
            </Badge>
            <h1 className="mb-6 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl animate-text-shimmer brush-stroke">
              Krati Kala
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Where engineering precision meets artistic passion
            </p>
          </div>
        </div>
      </section>

      {/* Artist Story Section */}
      <section ref={storyRef} className="py-16 bg-gradient-to-b from-white to-rose-50">
        <div className="container px-4 mx-auto sm:px-6 md:px-8">
          <div className={`grid items-center gap-12 lg:grid-cols-2 ${isVisible.story ? "animate-fade-in-left" : "opacity-0"}`}>
            <div className="flex justify-center">
              <div className="relative group">
                <div className="overflow-hidden relative w-64 h-64 rounded-2xl shadow-2xl transition-all duration-500 md:w-80 md:h-80 group-hover:scale-105 animated-border">
                  <Image
                    src="/imagekrati.jpg"
                    alt="Artist Krati"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t to-transparent from-black/20" />
                </div>
                <div className="absolute -right-4 -bottom-4 p-3 bg-white rounded-full shadow-lg">
                  <Palette className="w-6 h-6 text-rose-500" />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  The Story Behind the Canvas
                </h2>
                <p className="text-lg leading-relaxed text-gray-700">
                  With roots in the structured world of Civil Engineering, our artist embarked on an inspiring journey into the boundless realm of creativity. This unique background bridges the gap between meticulous design and the free-flowing expression found in every brushstroke.
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                  Imagine the careful calculation of lines and structures transforming into vibrant landscapes and evocative abstracts. It's a fusion of left-brain logic and right-brain artistry, resulting in pieces that are both technically sound and emotionally resonant.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-rose-800 bg-rose-100 hover:bg-rose-200">
                  <Award className="mr-1 w-4 h-4" />
                  Engineering Background
                </Badge>
                <Badge variant="secondary" className="text-purple-800 bg-purple-100 hover:bg-purple-200">
                  <Heart className="mr-1 w-4 h-4" />
                  Artistic Passion
                </Badge>
                <Badge variant="secondary" className="text-pink-800 bg-pink-100 hover:bg-pink-200">
                  <Sparkles className="mr-1 w-4 h-4" />
                  Creative Vision
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section ref={journeyRef} className="py-16 bg-white">
        <div className="container px-4 mx-auto sm:px-6 md:px-8">
          <div className={`text-center mb-12 ${isVisible.journey ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              The Artistic Journey
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Each artwork is more than just paint on canvas; it's a narrative of transformation, a celebration of pursuing one's true calling.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animated-border">
              <CardContent className="p-6">
                <div className="flex justify-center items-center mb-4 w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">Technical Foundation</h3>
                <p className="text-gray-600">
                  Years of engineering discipline provide the structural foundation for artistic expression, ensuring every piece has both beauty and balance.
                </p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animated-border">
              <CardContent className="p-6">
                <div className="flex justify-center items-center mb-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">Creative Evolution</h3>
                <p className="text-gray-600">
                  The transition from structured thinking to artistic freedom, where precision meets passion in every brushstroke and color choice.
                </p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animated-border">
              <CardContent className="p-6">
                <div className="flex justify-center items-center mb-4 w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">Emotional Connection</h3>
                <p className="text-gray-600">
                  Creating pieces that resonate with viewers, where structure dances with spontaneity to evoke genuine emotional responses.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social & Contact Section */}
      <section ref={socialRef} className="py-16 bg-gradient-to-b from-rose-50 to-white">
        <div className="container px-4 mx-auto sm:px-6 md:px-8">
          <div className={`text-center mb-12 ${isVisible.social ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Connect & Explore
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Follow the artistic journey and discover more creations across social platforms.
            </p>
          </div>
          <div className="flex flex-col gap-6 justify-center items-center sm:flex-row">
            <Link href="https://www.instagram.com/krati_kreates?igsh=cHhod283Z214YTIx" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-3 bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg transition-all duration-300 hover:from-pink-600 hover:to-rose-600 hover:shadow-xl">
                <Instagram className="w-5 h-5" />
                Follow on Instagram
              </Button>
            </Link>
            <Link href="https://m.youtube.com/@kratikreates2305?fbclid=PAY2xjawJidthleHRuA2FlbQIxMAABp_VLxgd8d_oQqeqr1TYXgC9dNqh06VAVC8kVxm5VmfkvhTklwKkNZS88g0oL_aem_6Af4CFfkwX9zY5oVIpw0lw" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="gap-3 text-red-500 border-red-500 shadow-lg transition-all duration-300 hover:bg-red-50 hover:shadow-xl">
                <Youtube className="w-5 h-5" />
                Watch on YouTube
              </Button>
            </Link>
            <Link href="/gallery">
              <Button size="lg" variant="outline" className="gap-3 text-purple-500 border-purple-500 shadow-lg transition-all duration-300 hover:bg-purple-50 hover:shadow-xl">
                <Palette className="w-5 h-5" />
                View Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 