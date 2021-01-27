import { I__Name__, I__Name__Instance } from "./__Name__.interface";

const build__Name__ = () => {
  return class __Name__ implements I__Name__Instance {
    constructor(private dto: I__Name__) {}

    public getID() {
      return this.dto.id;
    }

    public toDTO() {
      return this.dto;
    }
  };
};

export default build__Name__;
