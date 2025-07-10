export interface Company {
	name: string;
	link: string;
}

export interface Project {
	name: string;
	description?: string;
	asPartOf?: Company;
	points: string[];
	link: string;
}

export interface Blog {
	name: string;
	external: boolean;
	link: string;
	description: string;
}
