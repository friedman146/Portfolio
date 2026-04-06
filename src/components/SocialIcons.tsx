type Props = {
  youtube?: string
  instagram?: string
}

function YoutubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="14" rx="3" />
      <polygon points="10,9.5 16,13 10,16.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function SocialIcons({ youtube, instagram }: Props) {
  if (!youtube && !instagram) return null

  return (
    <div className="flex gap-5">
      {youtube && (
        <a
          href={youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="text-silver/40 hover:text-beige transition-colors duration-300"
          aria-label="YouTube"
        >
          <YoutubeIcon />
        </a>
      )}
      {instagram && (
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-silver/40 hover:text-beige transition-colors duration-300"
          aria-label="Instagram"
        >
          <InstagramIcon />
        </a>
      )}
    </div>
  )
}

export default SocialIcons
