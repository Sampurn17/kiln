"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, MessageSquare, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteProject } from "@/actions/projects";
import type { ProjectSummary } from "@/types/project";

// ─── Single card ──────────────────────────────────────────────────────────────

function Card({ project }: { project: ProjectSummary }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProject(project.id);
    } catch {
      setIsDeleting(false);
    }
  };

  const timeAgo = formatRelativeTime(project.updatedAt);

  return (
    <div className="group relative rounded-xl border border-white/6 bg-[#111111] transition-colors hover:border-white/12 hover:bg-[#141414]">
      <Link
        href={`/workspace?id=${project.id}`}
        className="block px-5 pb-4 pt-5"
      >
        {/* Title */}
        <h3 className="mb-1.5 truncate text-sm font-semibold text-white/80 group-hover:text-white/95">
          {project.title ?? "Untitled project"}
        </h3>

        {/* First prompt preview */}
        <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-white/30">
          {project.firstPrompt ?? "No prompt yet"}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-4 text-[11px] text-white/20">
          <span className="flex items-center gap-1">
            <MessageSquare className="h-3 w-3" />
            {project.messageCount}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {timeAgo}
          </span>
        </div>
      </Link>

      {/* Delete button — visible on hover */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger
          render={
            <button
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-md bg-white/0 text-white/0 transition-all group-hover:bg-white/6 group-hover:text-white/30 hover:!bg-red-500/15 hover:!text-red-400"
              aria-label="Delete project"
            />
          }
        >
          <Trash2 className="h-3.5 w-3.5" />
        </DialogTrigger>

        <DialogContent className="border-white/8 bg-[#111111] sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-white/90">Delete project?</DialogTitle>
            <DialogDescription className="text-white/40">
              This will permanently delete{" "}
              <span className="text-white/60">
                {project.title ?? "this project"}
              </span>{" "}
              and all its chat history. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDialogOpen(false)}
              className="text-white/50"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Trash2 className="h-3.5 w-3.5" />
              )}
              {isDeleting ? "Deleting…" : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Grid ─────────────────────────────────────────────────────────────────────

interface ProjectCardProps {
  projects: ProjectSummary[];
}

export function ProjectCard({ projects }: ProjectCardProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id} project={project} />
      ))}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const d = new Date(date);
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60_000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;

  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
