const LOCAL_DOMAINS = ["localhost", "127.0.0.1", ""];

const checkLocal = (hostname: string) => LOCAL_DOMAINS.includes(hostname);

export default checkLocal;
