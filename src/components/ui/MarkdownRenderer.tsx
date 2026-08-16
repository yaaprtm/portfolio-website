"use client";

import React from "react";

interface Props {
  content: string;
}

/**
 * Custom High-Contrast Markdown Renderer for Catatan Teknis
 */
export default function MarkdownRenderer({ content }: Props) {
  const lines = content.split(/\r?\n/);
  const elements: React.ReactNode[] = [];

  let inCodeBlock = false;
  let codeBlockLang = "";
  let codeBlockBuffer: string[] = [];

  let inList = false;
  let listBuffer: string[] = [];

  const flushList = (keyPrefix: string) => {
    if (inList && listBuffer.length > 0) {
      elements.push(
        <ul key={`${keyPrefix}-ul`} className="space-y-2 my-4 pl-2 font-sans text-slate-300">
          {listBuffer.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm leading-relaxed">
              <span className="text-cyan-neon font-mono font-bold mt-0.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
      listBuffer = [];
      inList = false;
    }
  };

  lines.forEach((line, idx) => {
    // Check Code Block boundaries
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        // End code block
        elements.push(
          <div key={`code-${idx}`} className="my-6 glass-card overflow-hidden border border-white/10 rounded-2xl bg-navy-950">
            <div className="px-4 py-2 bg-white/[0.04] border-b border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>{codeBlockLang || "bash/cli"}</span>
              <span className="text-cyan-neon">terminal</span>
            </div>
            <pre className="p-4 overflow-x-auto text-xs font-mono text-cyan-neon/90 leading-relaxed">
              <code>{codeBlockBuffer.join("\n")}</code>
            </pre>
          </div>
        );
        codeBlockBuffer = [];
        inCodeBlock = false;
      } else {
        flushList(`list-${idx}`);
        inCodeBlock = true;
        codeBlockLang = line.replace("```", "").trim();
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockBuffer.push(line);
      return;
    }

    // Check Unordered List Items
    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      inList = true;
      listBuffer.push(line.trim().substring(2));
      return;
    } else {
      flushList(`list-${idx}`);
    }

    // Check Headings
    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={`h1-${idx}`} className="text-2xl sm:text-4xl font-extrabold text-slate-100 mt-8 mb-4 tracking-tight leading-tight">
          {line.replace("# ", "")}
        </h1>
      );
      return;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={`h2-${idx}`} className="text-xl sm:text-2xl font-bold text-slate-100 mt-8 mb-3 tracking-tight border-b border-white/10 pb-2">
          {line.replace("## ", "")}
        </h2>
      );
      return;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={`h3-${idx}`} className="text-lg font-semibold text-cyan-neon mt-6 mb-2">
          {line.replace("### ", "")}
        </h3>
      );
      return;
    }

    // Check Blockquote
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={`quote-${idx}`} className="my-5 p-4 rounded-xl bg-cyan-soft border-l-4 border-cyan-neon text-slate-200 text-sm font-sans leading-relaxed italic">
          {line.replace("> ", "")}
        </blockquote>
      );
      return;
    }

    // Check Horizontal Rule
    if (line.trim() === "---") {
      elements.push(<hr key={`hr-${idx}`} className="my-8 border-white/10" />);
      return;
    }

    // Paragraph
    if (line.trim().length > 0) {
      elements.push(
        <p key={`p-${idx}`} className="my-3 text-slate-300 text-sm sm:text-base leading-relaxed">
          {line}
        </p>
      );
    }
  });

  flushList("list-end");

  return <div className="space-y-1">{elements}</div>;
}
