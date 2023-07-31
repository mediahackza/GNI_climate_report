const tag = {
    type: 'tag',
    name: 'emissons',
    active: true,
    children: [],
    parent: [], 
    hasChild(child_name) {

        return this.children.some(a => {
            return a.name == child_name;
        })
    },
    hasParent(parent_name) {
        return this.parent.some(a => {
            return a.name == parent_name;
        })
    },  
    addChild(child_tag) {
        if (!this.hasChild(child_tag.name)) {
            this.children.push(child_tag);
            child_tag.addParent(this)
        }
    },

    addParent(parent_tag) {
        if (!this.hasParent(parent_tag.name)) {
            this.parent.push(parent_tag);
            // parent_tag.children.push(this);
        }
    },
    toggleActive(){
        this.active = !this.active;

        this.children.forEach(e => {
            e.set_active(this.active);
        });
        return this.active;
    },
    set_active(value) {
        this.active = value;
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
    this.parent = [];
}

Object.assign(Tag.prototype, tag);

export { Tag as Tag_con };