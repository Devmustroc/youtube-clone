import {SearchIcon} from "lucide-react";

export const SearchInput = () => {
	return (
		<form
			className="flex w-full max-w-[600px]"
		>
			<div
				className="relative w-full"
			>
				<input
					type="text"
					placeholder="Search..."
					className="w-full pl-4 pr-10 py-2 pr-12 rounded-l-full border border-gray-300 focus:outline-none focus:border-blue-500"
					aria-label="Search"
					aria-describedby="search-button"
				/>
			</div>
			<button
				type="submit"
				id="search-button"
				className="px-5 py-2.5 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
			>
				<SearchIcon className="size-5"/>
			</button>
		</form>
	);
};
