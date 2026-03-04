export function formatCount(value, label = "") {
    
    if (value == null) return "";

    const num = Number(value);
    if (isNaN(num)) return "";

    let formatted;
    if (num < 1000) formatted = num.toString();
    else if (num < 1_000_000) formatted = `${Math.round(num / 1000)}k`;
    else formatted = `${Math.round(num / 1_000_000)}M`;

    return label ? `${formatted} ${label}` : formatted;
}


export function timeAgo(publishedAt) {
    if (!publishedAt) return "";

    const now = new Date();
    const publishedDate = new Date(publishedAt);

    const diffMs = now - publishedDate;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return "Today";
    if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months} month${months > 1 ? "s" : ""} ago`;
    }
    const years = Math.floor(diffDays / 365);
    return `${years} year${years > 1 ? "s" : ""} ago`;
}