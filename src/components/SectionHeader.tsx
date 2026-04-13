interface SectionHeaderProps {
  title: string;
  description: string;
}

export default function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-5 sm:mb-6">
      <h2 className="text-[16px] sm:text-[18px] lg:text-[20px] font-semibold text-white/92 leading-[1.3] tracking-[-0.01em] mb-1.5">
        {title}
      </h2>
      <p className="text-[12px] sm:text-[13px] text-white/40 leading-relaxed">{description}</p>
    </div>
  );
}
