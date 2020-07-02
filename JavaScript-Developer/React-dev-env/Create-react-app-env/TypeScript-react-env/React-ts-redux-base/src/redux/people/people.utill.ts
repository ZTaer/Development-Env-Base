import { OO7Cul } from '../../assets/oo7-react-bts.v0.1.1';
import { AnyObject } from './people.modle';

const { clearString } = OO7Cul as any ;

export const clearStrings = clearString;

export const peopleResultFind = ( props: AnyObject, target: string ): any[] => {
    if( props && target ){
        return props.filter( (item: AnyObject)=>{
            return item.name.includes(target);
        } );
    }
    return [];
};
