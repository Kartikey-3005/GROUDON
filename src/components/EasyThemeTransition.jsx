import React from 'react';

/**
 * EasyThemeTransition
 * Recreates the CodePen easytransitions effect with translucent glassy panels,
 * 8-way directional parts (diagonal, diamond, horizontal, vertical, wipes),
 * and dynamic translucent glass colors matching the selected theme.
 */
export default function EasyThemeTransition({
  isTransitioning,
  transitionType = 'split_diamond',
  targetTheme
}) {
  if (!isTransitioning || !targetTheme) return null;

  // Use the theme's vibrant icon/accent color with translucent glassy sheen
  const color = targetTheme.iconColor || targetTheme.accent || '#ea580c';

  return (
    <div 
      className="easytransitions_overlay"
      style={{
        '--theme-transition-color': color,
        '--theme-transition-bg': `${color}66`,
        '--theme-transition-border': `${color}aa`
      }}
    >
      <div className="easytransitions_transition">
        <div className={`easytransitions_part easytransitions_transition__part-1 ${transitionType}`} />
        <div className={`easytransitions_part easytransitions_transition__part-2 ${transitionType}`} />
        <div className={`easytransitions_part easytransitions_transition__part-3 ${transitionType}`} />
        <div className={`easytransitions_part easytransitions_transition__part-4 ${transitionType}`} />
        <div className={`easytransitions_part easytransitions_transition__part-5 ${transitionType}`} />
        <div className={`easytransitions_part easytransitions_transition__part-6 ${transitionType}`} />
        <div className={`easytransitions_part easytransitions_transition__part-7 ${transitionType}`} />
        <div className={`easytransitions_part easytransitions_transition__part-8 ${transitionType}`} />
      </div>
    </div>
  );
}
