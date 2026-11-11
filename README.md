# vf-website-live

- Branch `hostinger`: the live site, virtualfudge.com. Hostinger deploys it; `tools/publish-live.sh --push` in vf-website writes it.
- Branch `main`: the old password preview at virtualfudgehq.com, taken down on 11 Nov 2026 (Vemir). It now only forwards
  visitors to virtualfudge.com, and holds the GitHub site check (.github/), which watches virtualfudge.com every 30 minutes.
  The preview's last full copy is in this branch's history (commit before the take-down).
