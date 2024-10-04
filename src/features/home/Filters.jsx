import { Select } from "antd";

function Filters({ selectedCategory, setSelectedCategory, sortOrder, setSortOrder }) {
    const { Option } = Select;

    const categories = ["All", "electronics", "jewelery", "men's clothing", "women's clothing"];
    const sortOptions = ["Default", "Price: Low to High", "Price: High to Low"];

    return (
        <div className="mb-6 flex justify-end items-center gap-6">
            <div className="flex items-center gap-4">
                <label className="text-gray-700 font-normal">Filter by Category</label>
                <Select
                    value={selectedCategory}
                    style={{ width: 200 }}
                    onChange={setSelectedCategory}
                >
                    {categories.map((category) => (
                        <Option key={category} value={category}>
                            {category === "All" ? "All Products" : category.charAt(0).toUpperCase() + category.slice(1)}
                        </Option>
                    ))}
                </Select>
            </div>
            <div className="flex items-center gap-4">
                <label className="text-gray-700 font-normal">Sort by</label>
                <Select
                    value={sortOrder}
                    style={{ width: 200 }}
                    onChange={setSortOrder}
                >
                    {sortOptions.map((option) => (
                        <Option key={option} value={option}>
                            {option}
                        </Option>
                    ))}
                </Select>
            </div>
        </div>
    );
}

export default Filters;
