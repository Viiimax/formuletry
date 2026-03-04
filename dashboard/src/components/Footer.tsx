import Link from "next/link";

export default function Footer() {
	return (
		<footer className="my-8 text-sm text-zinc-500">
			<div className="mb-4 flex flex-wrap gap-2">
				<p>
					Maintained by <TextLink website="https://x.com/MaximoLXXXI">MaximoLXXXI</TextLink>.
				</p>

				<p>
					Based on <TextLink website="https://github.com/slowlydev/f1-dash">f1-dash</TextLink> by slowlydev.
				</p>

				<p>
					<TextLink website="https://tecito.app/formuletry">Invitame un tecito</TextLink> para apoyar el proyecto.
				</p>

				<p>

					<Link className="text-blue-500" href="/help">
						Help
					</Link>
					.
				</p>

				<p>Version: {process.env.version}</p>
			</div>

			<p className="mb-2">
				© 2023-Present slowlydev (original f1-dash) · © 2026-Present MaximoLXXXI (Formuletry fork)
			</p>

			<p className="mb-2">
			Licensed under <TextLink website="https://www.gnu.org/licenses/agpl-3.0.html">GNU AGPL v3</TextLink>.
		</p>

		<p>
				This project/website is unofficial and is not associated in any way with the Formula 1 companies. F1, FORMULA
				ONE, FORMULA 1, FIA FORMULA ONE WORLD CHAMPIONSHIP, GRAND PRIX and related marks are trademarks of Formula One
				Licensing B.V.
			</p>

			<p>
				Links to legal pages:
				<Link className="text-blue-500" href="/privacy">
					Privacy Policy
				</Link>
				·
				<Link className="text-blue-500" href="/terms">
					Terms of Service
				</Link>
				·
				<Link className="text-blue-500" href="/about">
					About Us
				</Link>
				·
				<Link className="text-blue-500" href="/contact">
					Contact
				</Link>
			</p>
		</footer>
	);
}

type TextLinkProps = {
	website: string;
	children: string;
};

const TextLink = ({ website, children }: TextLinkProps) => {
	return (
		<a className="text-blue-500" target="_blank" href={website}>
			{children}
		</a>
	);
};
