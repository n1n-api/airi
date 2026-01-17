const SvgN1N = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="1em"
        height="1em"
        {...props}
    >
        <rect width={512} height={512} fill="#000000" rx={104} ry={104} />
        <path
            fill="#ffffff"
            d="M140 160h40l80 120V160h40v200h-40l-80-120v120h-40V160zm160 0h60c22 0 40 18 40 40v20c0 22-18 40-40 40h-60v-100zm40 40v20h20c11 0 20-9 20-20s-9-20-20-20h-20zm-40 100h40l80 60h-50l-70-60zM140 320h232v40H140z"
            style={{ opacity: 0.9 }}
        />
    </svg>
);
export default SvgN1N;
