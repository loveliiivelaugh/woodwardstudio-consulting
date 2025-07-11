import cicdBlog from "./cicd_blog.md";
import walkingBlog from "./walking.md";
import nostalgiaPost from "./nostalgia.md";
import ethicsPost from "./ethics.md";
import codeReviewPost from "./codereview.md";
import aiPost from "./ai.md";

export type PostType = {
    title: string;
    subtitle: string;
    publishedDate: string;
    topic: string;
    coverImageUrl: string;
    content: string;
};

export const postsData: PostType[] = [
    {
        title: "Why Walking Clears the Mind",
        subtitle: "The surprising benefits of a simple stroll",
        publishedDate: "2/3/24",
        topic: "Wellness",
        coverImageUrl: "https://loremflickr.com/200/200?random=1",
        content: walkingBlog ||
            "Walking isn't just exercise—it's a mental refresh. Taking time to walk clears your thoughts, inspires creativity, and improves mental clarity. It's a simple habit with profound benefits."
    },
    {
        title: "Why Nostalgia Shapes Modern Trends",
        subtitle: "The pull of the past in a digital world",
        publishedDate: "11/20/24",
        topic: "Culture",
        coverImageUrl: "https://loremflickr.com/200/200?random=1",
        content: nostalgiaPost ||
            "From fashion to design, nostalgia influences today's trends. This article explores why we’re drawn to the past and how creators leverage that emotional connection in the digital age."
    },
    {
        title: "The Philosophy of AI Ethics",
        subtitle: "Can machines make moral decisions?",
        publishedDate: "1/12/25",
        topic: "AI",
        coverImageUrl: "https://loremflickr.com/200/200?random=1",
        content: ethicsPost ||
            "As AI systems make increasingly autonomous decisions, the question of ethics becomes critical. We explore the philosophical frameworks that might guide moral AI development."
    },
    {
        title: "Demystifying Continuous Integration",
        subtitle: "How CI improves development workflows",
        publishedDate: "1/6/25",
        topic: "Engineering",
        coverImageUrl: "https://loremflickr.com/200/200?random=1",
        content: cicdBlog ||
        "Continuous Integration (CI) is a cornerstone of modern software delivery. Learn how it automates testing, reduces bugs, and helps teams ship features faster with confidence."
    },
    {
        title: "Why Code Reviews Are Essential",
        subtitle: "The power of collaboration in coding",
        publishedDate: "7/1/24",
        topic: "Engineering",
        coverImageUrl: "https://loremflickr.com/200/200?random=1",
        content: codeReviewPost ||
            "Code reviews aren’t just about catching bugs—they’re about fostering collaboration, improving code quality, and building better engineers. Discover best practices and team tips."
    },
    {
        title: "How AI is Changing the Way We Work",
        subtitle: "AI tools & their impact on productivity.",
        publishedDate: "1/16/25",
        topic: "AI",
        coverImageUrl: "https://loremflickr.com/200/200?random=1",
        content: aiPost ||
            "AI tools are transforming work as we know it—from automating tasks to enhancing decision-making. Here’s how companies are leveraging AI to boost productivity and innovation."
    }
].map((post, index) => ({ ...post, id: index }));