declare interface vue {
    // shadowRoot?: any;
    public el: any;
    public data: any;
    public methods: any;
    public init: ()=> void;
    public created: ()=> void;
}