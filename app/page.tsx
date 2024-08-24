"use client";
import Image from "next/image";
import Link from "next/link";
import "./index.css";
import React from "react";

export default function Page() {
  return (
    <div className="w-full h-full pb-8">
      <section className="hero_section">
        <div className="section_container">
          <div className="hero_container">
            <div className="text_section">
              <Image width={180} height={57} src="/ises.png" alt="GCK" />

              <h2>Bienvenue à l&apos;ISES Likasi !</h2>
              <h3>L&apos;avenir c&apos;est nous !</h3>
              <p>
                Etudiez dans les meilleurs cadres et assurez votre avenir avec
                nous !!!
              </p>
              <div className="hero_section_button">
                <Link href="/login">
                  <button className="button">Se connecter</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
