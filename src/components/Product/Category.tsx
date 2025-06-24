export class Category {
    id: number;
    name: string;
    icon: string;
    color: string;

    constructor(id: number, name: string, icon: string, color: string) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.color = color
    }

    renderCategory() {
        return (
            <a
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
            href="#"
            >
                <span
                    className="material-icons text-5xl mb-2"
                    style={{ color: this.color }}
                >
                    {this.icon}
                </span>
                <p className="font-medium text-custom-black">{this.name}</p>
            </a>
        )
    }
}