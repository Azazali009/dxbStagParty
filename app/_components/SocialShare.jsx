"use client";

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

export default function SocialShare({ title, url }) {
  return (
    <div className="sticky top-0 flex gap-2">
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon
          size={32}
          round
          className="duration-300 hover:scale-90 active:translate-y-2"
        />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={title}>
        <TwitterIcon
          size={32}
          round
          className="duration-300 hover:scale-90 active:translate-y-2"
        />
      </TwitterShareButton>

      <LinkedinShareButton url={url} title={title}>
        <LinkedinIcon
          size={32}
          round
          className="duration-300 hover:scale-90 active:translate-y-2"
        />
      </LinkedinShareButton>

      <WhatsappShareButton url={url} title={title} separator=" - ">
        <WhatsappIcon
          size={32}
          round
          className="duration-300 hover:scale-90 active:translate-y-2"
        />
      </WhatsappShareButton>

      <EmailShareButton url={url} subject={title} body="Check this out: ">
        <EmailIcon
          size={32}
          round
          className="duration-300 hover:scale-90 active:translate-y-2"
        />
      </EmailShareButton>
    </div>
  );
}
