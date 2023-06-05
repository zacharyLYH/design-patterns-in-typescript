/*
Imagine AWS's permissions system. The real permissions and security groups engine in AWS is complex and unfeasible to reimplement here, so we'll just get a taste of it here. 

Let's suppose in our mini AWS system, we have only 2 services, service A and service B. Each service will have its own "default" permissions. Since this is arbitrary and we're making things up as we go, let the default permissions to be:
- Service A: R
- Service B: RX

Now, we want to add permissions (or decorate the list of permissions) with more permissions. The permissions you may add are W, X, and 3 made up permissions E,F,G. 

A few things to note: 
- We won't implement removing permissions in this example, because as per the drawback of Decorator pattern, once a decorator is set, it is non-trivial to unset it.
- We'll not be implementing the notion of Admins, Users, Guests etc. and configuring the permissions according to their respective roles. One can attempt to do that, but doing so takes away focus on the real "decorative" element of the Decorator pattern, which is what we want to present here. Think of an instance of this ServicePermissions a property of a larger "User class". 

IMPORTANT: 
There are conceivably better ways of implementing this with other patterns, indeed. So, for the sake of this example, try imagining the code from Service A and Service B CANNOT BE MODIFIED AT ALL COSTS. (Perhaps there is some code in there nobody understand how it works, but if you changed anything then everything breaks down.) That said, the only choice left is to "tack on" or "extend" the already existing permissions as "decorators". 
*/

interface AWS_PERM {
    getPermissions(): string;
}

class ServiceA implements AWS_PERM {
    getPermissions(): string {
        return "R";
    }
}

class ServiceB implements AWS_PERM {
    getPermissions(): string {
        return "RX";
    }
}

abstract class PermissionsDecorator implements AWS_PERM {
    protected permission: AWS_PERM;
    constructor(perm: AWS_PERM) {
        this.permission = perm;
    }
    getPermissions(): string {
        return "";
    }
}

// If the current permissions already includes toAdd, then return false.
function hasPermission(perm: string, toAdd: string): boolean {
    return !perm.includes(toAdd);
}

class W_Permission extends PermissionsDecorator {
    getPermissions(): string {
        if (hasPermission(this.permission.getPermissions(), "W")) {
            return this.permission.getPermissions() + "W";
        } else {
            return this.permission.getPermissions();
        }
    }
}

class X_Permission extends PermissionsDecorator {
    getPermissions(): string {
        if (hasPermission(this.permission.getPermissions(), "X")) {
            return this.permission.getPermissions() + "X";
        } else {
            return this.permission.getPermissions();
        }
    }
}

class E_Permission extends PermissionsDecorator {
    getPermissions(): string {
        if (hasPermission(this.permission.getPermissions(), "E")) {
            return this.permission.getPermissions() + "E";
        } else {
            return this.permission.getPermissions();
        }
    }
}

class F_Permission extends PermissionsDecorator {
    getPermissions(): string {
        if (hasPermission(this.permission.getPermissions(), "F")) {
            return this.permission.getPermissions() + "F";
        } else {
            return this.permission.getPermissions();
        }
    }
}

class G_Permission extends PermissionsDecorator {
    getPermissions(): string {
        if (hasPermission(this.permission.getPermissions(), "G")) {
            return this.permission.getPermissions() + "G";
        } else {
            return this.permission.getPermissions();
        }
    }
}

function showPermissions(service: AWS_PERM): void {
    console.log(service.getPermissions());
}

const service_A: AWS_PERM = new ServiceA();
showPermissions(service_A);

//Note: As mentioned in the Overview section of README, each time you decorate an object, you're creating a new object with the decoration attached, like in service_A_with_X in composed of service_A and X_permission. In this example alone, we created 3 distinct and separate objects to add 2 new permissions - not very efficient. Good news is, the code in the ServiceA class wasn't modified at all to incorporate 2 new permissions!
const service_A_with_X: X_Permission = new X_Permission(service_A);
showPermissions(service_A_with_X);

const service_A_with_XG: G_Permission = new G_Permission(service_A_with_X);
showPermissions(service_A_with_XG);

// One more interesting thing to note. Not related to the decorator pattern, service_A_with_XG can take on the type of G_Permission, AWS_Perm, and PermissionsDecorator. Ofcourse, they refer to the same base type of AWS_Perm, but still, interesting.
