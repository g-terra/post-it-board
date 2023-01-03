import {Tooltip} from "../tooltip/tooltip";

export default function UserAvatar({avatar, name, surname}) {

    const initials = (name.charAt(0) + surname.charAt(0)).toUpperCase();

    return (
        <Tooltip content={name + ' ' + surname}>
            <div className={'grid h-10 w-10 rounded-full bg-red-400 align-middle items-center justify-center'}>
                <Tooltip content={name + ' ' + surname}/>
                <div className={
                    'grid h-10 w-10 rounded-full bg-red-400 align-middle items-center justify-center'
                }>
                    {
                        avatar ?
                            <img src={avatar} alt={name} className={'h-full w-full rounded-full'}/> :
                            <p className={'text-primary font-bold text-center'}>
                                {initials}
                            </p>
                    }
                </div>
            </div>
        </Tooltip>
    );
}