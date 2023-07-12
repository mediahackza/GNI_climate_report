const tag = {
    type: 'tag',
    name: 'emissons',
    active: true,
    children: [],
    hasChild(child_name) {

        return this.children.some(a => {
            return a.name == child_name;
        })
    },
    addChild(child_tag) {
        if (!this.hasChild(child_tag.name)) {
            this.children.push(child_tag);
        }
    },
    toggleActiveZ(){
        this.active = !this.active;
    },
    set_active(value) {
        console.log(`setting tag ${this.name} to ${value}`)
        this.active = value;
        console.log("children", this.children)
        this.children.forEach(e => {
            e.set_active(value);
        });
    },
    isActive() {
        return this.active;
    }

}

function Tag(type, value) {
    this.type = type;
    this.name = value;
    this.active = false;
    this.children = [];
}

Object.assign(Tag.prototype, tag);

export { Tag as Tag_con };