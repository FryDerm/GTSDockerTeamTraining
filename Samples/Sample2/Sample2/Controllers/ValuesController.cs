using System;
using System.Collections.Generic;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using ServiceStack.Redis;

namespace Sample2.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
	    // GET api/values
		[HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
			var con = GetRedisConnectionString();
			var manager = new RedisManagerPool(con);
			
			using (var client = manager.GetClient())
			{
				return client.Get<string>(id.ToString());
			}
		}

        // POST api/values
        [HttpPost]
        public int Post(string value)
        {
	        var con = GetRedisConnectionString();
			var manager = new RedisManagerPool(con);
			
			var id = new Random().Next();
			using (var client = manager.GetClient())
			{
				client.Set(id.ToString(), value);
			}

			return id;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

	    private string GetRedisConnectionString()
	    {
			//because of https://github.com/dotnet/corefx/issues/8768
			var dnsTask = Dns.GetHostAddressesAsync("redis");
			var addresses = dnsTask.Result;
		    var address = addresses[0].MapToIPv4().ToString();

		    return address;
	    }
    }
}
