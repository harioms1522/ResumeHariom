import { MDXProvider } from "@mdx-js/react";


const MyCustomProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <MDXProvider components={{}}>{children}</MDXProvider>
    );
}

export default MyCustomProvider;