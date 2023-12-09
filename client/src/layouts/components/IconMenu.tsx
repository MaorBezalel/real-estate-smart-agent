export default function IconMenu() {
    return (
        <ul className="flex items-center justify-center gap-6">
            <li>
                <GithubIcon />
            </li>
            <li>
                <YoutubeIcon />
            </li>
        </ul>
    );
}

function GithubIcon() {
    return (
        <a
            className="relative flex items-center justify-center rounded-full text-base text-[#121212] transition-[color,transform] duration-[294ms] ease-out before:absolute before:inset-0 before:block before:origin-center before:scale-0 before:rounded-full before:bg-[color:var(--color)] before:transition-transform before:duration-[294ms] before:content-[''] hover:text-secondary hover:before:scale-100 tablet-md:h-12 tablet-md:w-12 tablet-lg:h-14 tablet-lg:w-14"
            href="https://github.com/MaorBezalel/real-estate-smart-agent"
            target="_blank"
            rel="noopener noreferrer"
        >
            <svg
                className="relative transition-transform duration-[294ms] ease-out tablet-md:h-7 tablet-md:w-7 tablet-lg:h-9 tablet-lg:w-9"
                width="1792"
                height="1792"
                viewBox="0 0 1792 1792"
                xmlns="https://www.w3.org/2000/svg"
            >
                <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
            </svg>
        </a>
    );
}

function YoutubeIcon() {
    return (
        <a
            className="relative flex items-center justify-center rounded-full text-base text-red-600 transition-[color,transform] duration-[294ms] ease-out before:absolute before:inset-0 before:block before:origin-center before:scale-0 before:rounded-full before:bg-[color:var(--color)] before:transition-transform before:duration-[294ms] before:content-[''] hover:text-secondary hover:before:scale-100 tablet-md:h-12 tablet-md:w-12 tablet-lg:h-14 tablet-lg:w-14"
            href="https://github.com/MaorBezalel/real-estate-smart-agent"
            target="_blank"
            rel="noopener noreferrer"
        >
            <svg
                className="relative transition-transform duration-[294ms] ease-out tablet-md:h-7 tablet-md:w-7 tablet-lg:h-9 tablet-lg:w-9"
                width="50"
                height="35"
                viewBox="0 0 50 35"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="&#240;&#159;&#166;&#134; icon &#34;YouTube&#34;">
                    <path
                        id="Vector"
                        d="M48.7377 5.47632C48.1652 3.32072 46.4785 1.62303 44.3368 1.0469C40.4549 0 24.8889 0 24.8889 0C24.8889 0 9.32303 0 5.44104 1.0469C3.29939 1.62313 1.61264 3.32072 1.04016 5.47632C0 9.38346 0 17.5354 0 17.5354C0 17.5354 0 25.6873 1.04016 29.5944C1.61264 31.75 3.29939 33.377 5.44104 33.9531C9.32303 35 24.8889 35 24.8889 35C24.8889 35 40.4548 35 44.3368 33.9531C46.4785 33.377 48.1652 31.75 48.7377 29.5944C49.7778 25.6873 49.7778 17.5354 49.7778 17.5354C49.7778 17.5354 49.7778 9.38346 48.7377 5.47632ZM19.798 24.9367V10.134L32.808 17.5355L19.798 24.9367Z"
                        fill="#F92201"
                    />
                </g>
            </svg>
        </a>
    );
}
