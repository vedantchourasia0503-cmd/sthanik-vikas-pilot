import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { LANGS, useT, type Lang } from "@/lib/i18n";
import { parseVoice, type ParsedVoice } from "@/lib/voice-parse";
import { cn } from "@/lib/utils";

export function VoiceCapture({
  lang,
  onParsed,
}: {
  lang: Lang;
  onParsed: (p: ParsedVoice, transcript: string) => void;
}) {
  const t = useT(lang);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");
  const recRef = useRef<any>(null);

  useEffect(() => {
    const w = window as any;
    setSupported(Boolean(w.SpeechRecognition || w.webkitSpeechRecognition));
    return () => {
      try {
        recRef.current?.stop();
      } catch {
        /* ignore */
      }
    };
  }, []);

  const start = () => {
    const w = window as any;
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) return;
    setError("");
    setTranscript("");
    const rec = new Ctor();
    recRef.current = rec;
    rec.lang = LANGS.find((l) => l.code === lang)?.speech ?? "en-IN";
    rec.interimResults = true;
    rec.continuous = false;
    rec.maxAlternatives = 1;

    rec.onresult = (e: any) => {
      let text = "";
      for (let i = 0; i < e.results.length; i++) text += e.results[i][0].transcript + " ";
      text = text.trim();
      setTranscript(text);
      if (e.results[e.results.length - 1].isFinal) onParsed(parseVoice(text), text);
    };
    rec.onerror = (e: any) => {
      setError(
        e.error === "not-allowed"
          ? "Microphone permission was blocked. Allow it in your browser settings, or use the form below."
          : "Could not catch that. Please try again or type the details below.",
      );
      setListening(false);
    };
    rec.onend = () => setListening(false);
    try {
      rec.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  };

  const stop = () => {
    try {
      recRef.current?.stop();
    } catch {
      /* ignore */
    }
    setListening(false);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <button
          type="button"
          onClick={listening ? stop : start}
          disabled={supported === false}
          className={cn(
            "group relative flex w-full max-w-md items-center justify-center gap-3 rounded-full px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all",
            "bg-primary hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60",
            listening && "bg-accent text-accent-foreground",
          )}
        >
          {listening ? (
            <>
              <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" />
              <Loader2 className="size-5 animate-spin" />
              {t("listening")}
            </>
          ) : (
            <>
              <Mic className="size-5" />
              🎤 {t("speak")}
            </>
          )}
        </button>

        {supported === false && (
          <p className="flex items-start gap-2 rounded-xl bg-muted px-4 py-3 text-left text-sm text-muted-foreground">
            <MicOff className="mt-0.5 size-4 shrink-0" />
            {t("voiceUnsupported")}
          </p>
        )}
        {supported !== false && !transcript && !error && (
          <p className="max-w-lg text-xs leading-relaxed text-muted-foreground">{t("voiceHint")}</p>
        )}
        {transcript && (
          <p className="w-full rounded-xl bg-secondary px-4 py-3 text-left text-sm text-secondary-foreground">
            <span className="font-semibold">{t("heard")}: </span>
            {transcript}
          </p>
        )}
        {error && (
          <p className="w-full rounded-xl bg-destructive/10 px-4 py-3 text-left text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
