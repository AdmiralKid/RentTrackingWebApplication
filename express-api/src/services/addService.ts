import { Services } from "../server/services";

export interface IAddService {
	add(a: number, b: number): number;
}

export class AddService1 {
	/**
	 *
	 */
	constructor({ userFactory }: Services) {}

	add(a: number, b: number): number {
		return a + b;
	}
}

export class AddService2 {
	add(a: number, b: number): number {
		return a + b + 1;
	}
}
